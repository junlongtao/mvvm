import { Dep, MVVM } from "./MVVM";
import { Watcher } from './watcher';

function isElementNode(node) {
    return node.nodeType === 1
}

function isAttributeNode(node) {
    return node.nodeType === 2
}

function isTextNode(node) {
    return node.nodeType === 3
}

export default class Compile {

    constructor(el, vm) {
        this.compileChildNodes(el, vm)
    }

    compileChildNodes(el, vm) {
        for (let i = 0, len = el.childNodes.length; i < len; i++) {
            const node = el.childNodes[i]
            const reg = /\{\{\s?(.*)\s?\}\}/
            const text = node.textContent
            if (isTextNode(node) && reg.test(text)) {
                compileUtil.text(node, vm, RegExp.$1)
            } else if (isElementNode(node)) {
                this.compileAttrs(node, vm)
            }

            if (node.childNodes && node.childNodes.length > 0) {
                this.compileChildNodes(node, vm)
            }
        }
    }

    // compileChildNodes(el) {
    //     [].slice.call(el.childNodes).forEach(function (item) {
    //         const text = item.textContent
    //         const reg = /\{\{(.*)\}\}/
    //         if (isElementNode(item)) {
    //             this.compileAttrs(item)
    //         } else if (isTextNode(item) && reg.test(text)) {
    //             this.compileText(item, RegExp.$1)
    //         }
    //
    //         if (item.childNodes && item.childNodes.length) {
    //             this.compileChildNodes(item)
    //         }
    //     })
    // }

    compileAttrs(node, vm) {
        var nodeAttrs = node.attributes;
        [].slice.call(nodeAttrs).forEach(item => {
            var attrName = item.name
            var attrValue = item.value
            if (!this.isDirective(attrName)) {
                return;
            }
            if (this.isEventDirective(attrName)) {
                var event = attrName.split(':')[1]
                node.addEventListener(event, vm.methods[attrValue].bind(vm), false)
            } else {
                const updater = compileUtil[attrName.substring(2)]
                updater && updater(node, vm, attrValue)
            }
        })
    }

    isDirective(attrName) {
        return attrName.indexOf('v-') === 0
    }

    isEventDirective(attName) {
        return attName.indexOf('v-on:') === 0
    }
}

const compileUtil = {
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
            const value = compileUtil.getVmValue(vm, exp.split(' ')[2])
            value.map(item => {
                const el = node.cloneNode(true)
                parent.appendChild(el)
                new MVVM({
                    el: el,
                    data: {
                        todo: item
                    }
                })
            })
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
            res = res[item]
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

