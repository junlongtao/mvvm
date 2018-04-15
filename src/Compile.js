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
                if (typeof vm[RegExp.$1] === 'function') {
                    node.textContent = vm[RegExp.$1].call(vm)
                } else {
                    node.textContent = vm[RegExp.$1]
                }
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
                var items = attrValue.split('.')
                var res = vm
                items.map(item => {
                    res = res[item]
                })
                node.value = res
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

class compileUtil {
    static text(node, vm, exp) {
        this.bind(node, vm, exp, 'text')
    }

    static bind(node, vm, exp, dir) {

    }
}

