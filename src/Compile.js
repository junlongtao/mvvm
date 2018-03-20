export default class Compile {

    constructor(el) {
        el = this.isElementNode(el) ? el : document.querySelector(el)
        const fragment = this.node2Fragment(el)
        el.appendChild(fragment)
    }

    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        return fragment
    }

    isElementNode(node){
        return node.nodeType == 1;
    }
}

