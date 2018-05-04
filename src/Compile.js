import { Dep, MVVM } from "./MVVM";
import { Watcher } from './watcher';

function isComponentNode(node, vm) {
    const tagName = node.tagName.toLowerCase()
    return vm._options.components[tagName]
}

function isElementNode(node) {
    return node.nodeType === 1
}

function isAttributeNode(node) {
    return node.nodeType === 2
}

function isTextNode(node) {
    return node.nodeType === 3
}

function compileChildNodes(el, vm) {
    for (let i = 0, len = el.childNodes.length; i < len; i++) {
        const node = el.childNodes[i]
        const reg = /\{\{\s?(.*)\s?\}\}/
        const text = node.textContent
        if (isTextNode(node) && reg.test(text)) {
            compileUtil.text(node, vm, RegExp.$1)
        } else if (isElementNode(node)) {
            compileAttrs(node, vm)
        }

        if (node.childNodes && node.childNodes.length > 0) {
            compileChildNodes(node, vm)
        }
    }
}

function compileAttrs(node, vm) {
    const tagName = node.tagName.toLowerCase()
    const component = vm._options.components[tagName]
    if (component) {
        const template = component.options.template
        const doc = new DOMParser().parseFromString(template, 'text/html')
        const el = doc.querySelector('body').firstChild
        node.parentNode.insertBefore(el, node)
        node.parentNode.removeChild(node)

        const options = {
            el: el,
            data: {}
        }
        const attributes = node.attributes;
        [].slice.call(attributes).forEach(item => {
            options.data[item.name] = item.value
        })
        new component(options)
        return
    }

    var nodeAttrs = node.attributes;
    [].slice.call(nodeAttrs).forEach(item => {
        var attrName = item.name
        var attrValue = item.value
        if (!compileUtil.isDirective(attrName)) {
            return;
        }
        if (compileUtil.isEventDirective(attrName)) {
            var event = attrName.split(':')[1]
            node.addEventListener(event, vm.methods[attrValue].bind(vm), false)
        } else {
            const updater = compileUtil[attrName.substring(2)]
            updater && updater(node, vm, attrValue)
        }
    })
}

export function compile(el, vm) {
    compileChildNodes(el, vm)
}

const compileUtil = {
    isDirective: function (attrName) {
        return attrName.indexOf('v-') === 0
    },

    isEventDirective: function (attName) {
        return attName.indexOf('v-on:') === 0
    },

    text: function (node, vm, exp) {
        function updater() {
            const value = compileUtil.getVmValue(vm, exp)
            node.textContent = value
        }

        updater()
        new Watcher(vm, exp, updater)
    },

    model: function (node, vm, exp) {
        function updater() {
            const value = compileUtil.getVmValue(vm, exp)
            node.value = value
        }

        updater()
        new Watcher(vm, exp, updater);

        node.addEventListener('input', e => {
            compileUtil.setVmValue(vm, exp, e.target.value)
        })
    },

    html: function (node, vm, exp) {
        function updater() {
            node.innerHTML = compileUtil.getVmValue(vm, exp)
        }

        updater()
        new Watcher(vm, exp, updater);
    },

    if: function (node, vm, exp) {
        function updater() {
            node.style.display = compileUtil.getVmValue(vm, exp) ? 'block' : 'none'
        }

        updater()
        new Watcher(vm, exp, updater)
    },

    for: function (node, vm, exp) {
        function updater() {
            const parent = node.parentElement
            parent.innerHTML = ''

            const cloneNode = node.cloneNode(true)
            const value = compileUtil.getVmValue(vm, exp.split(' ')[2])
            for (let i = 0, len = value.length; i < len; i++) {
                const item = value[i]
                const el = cloneNode.cloneNode(true)
                el.removeAttribute('v-for')
                parent.appendChild(el)
                new MVVM({
                    el: el,
                    data: {
                        todo: item
                    }
                })
            }
        }

        updater()
        new Watcher(vm, exp, updater)
    },

    getVmValue: function (vm, exp) {
        if (typeof vm[exp] === 'function') {
            return vm[exp].call(vm)
        }

        let res = vm
        const exps = exp.split('.')
        exps.map(item => {
            if (res) res = res[item]
        })
        return res
    },

    setVmValue: function (vm, exp, value) {
        let val = vm;
        const exps = exp.split('.')
        exps.forEach((k, i) => {
            // 非最后一个key，更新val的值
            if (i < exps.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
}

