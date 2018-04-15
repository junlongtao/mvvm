import { Dep } from "./MVVM";

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
        el = document.querySelector(el)
        this.compileChildNodes(el, vm)
    }

    compileChildNodes(el, vm) {
        for (let i = 0, len = el.childNodes.length; i < len; i++) {
            const node = el.childNodes[i]
            const reg = /\{\{(.*)\}\}/
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
        console.log(node)
        var nodeAttrs = node.attributes;
        [].slice.call(nodeAttrs).forEach(item => {
            console.log(item)
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

    compileText(node, exp) {
        compileUtil.text(node, exp)
    }
}

const compileUtil = {
    text: function (node, vm, exp) {
        function updateText() {
            const value = compileUtil.getVmValue(vm, exp)
            node.textContent = value
        }

        Dep.target = updateText
        updateText()
    },

    model: function (node, vm, exp) {
        function updateValue() {
            const value = compileUtil.getVmValue(vm, exp)
            node.value = value
        }

        Dep.target = updateValue
        updateValue()

        node.addEventListener('input', e => {
            compileUtil.setVmValue(vm, exp, e.target.value)
        })
    },

    html: function (node, vm, exp) {
        Dep.target = function () {
            node.innerHTML = compileUtil.getVmValue(vm, exp)
        }
        node.innerHTML = compileUtil.getVmValue(vm, exp)
    },

    getVmValue: function (vm, exp) {
        if (typeof vm[exp] === 'function') {
            return vm[exp].call(vm)
        }

        const items = exp.split('.')
        let res = vm
        items.map(item => {
            res = res[item]
        })
        return res
    },

    setVmValue: function (vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
}

