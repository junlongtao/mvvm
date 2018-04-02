function isElementNode(node) {
    return node.nodetype === 1
}

function isAttributeNode(node) {
    return node.nodetype === 2
}

function isTextNode(node) {
    return node.nodeType === 3
}

export default class Compile {

    constructor(el, vm) {
        el = document.querySelector(el)
        this.compileElement(el, vm)
    }

    compileElement(el, vm) {
        for (let i = 0, len = el.childNodes.length; i < len; i++) {
            const node = el.childNodes[i]
            console.log(node.nodeType)

            const reg = /\{\{(.*)\}\}/
            const text = node.textContent
            if (node.nodeType === 3 && reg.test(text)) {
                if(typeof vm[RegExp.$1] === 'function'){
                    node.textContent = vm[RegExp.$1].call(vm)
                }else{
                    node.textContent = vm[RegExp.$1]
                }
            }
            if (node.nodeType === 1) {
                this.compileElement(node, vm)
            }
        }
    }

    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        let child
        while (child = el.firstChild) {
            console.log(child)
            fragment.appendChild(child)
        }
        return fragment
    }

    isElementNode(node) {
        return node.nodeType == 1;
    }

    compileChildNodes(el) {
        [].slice.call(el.childNodes).forEach(function (item) {
            const text = item.textContent
            const reg = /\{\{(.*)\}\}/
            if (isElementNode(item)) {
                this.compileAttrs(item)
            } else if (isTextNode(item) && reg.test(text)) {
                this.compileText(item, RegExp.$1)
            }

            if (item.childNodes && item.childNodes.length) {
                this.compileChildNodes(item)
            }
        })
    }

    compileAttrs(node) {
        var nodeAttrs = node.attributes;
        [].slice.call(nodeAttrs).forEach(function (item) {
            var attrName = item.name
            if (!this.isDirective(attrName)) {
                return;
            }
            if (this.isEventDirective(attrName)) {
                compileUtil.eventHandler(node, me.$vm, exp, dir)
            } else {
                compileUtil[dir] && compileUtil[dir](node, me.$vm, exp)
            }


        })
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

