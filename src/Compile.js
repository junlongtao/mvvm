
function isElementNode(node){
    return node.nodetype === 2
}
function isTextNode(node){
    return node.nodeType === 3
}
export default class Compile {

    constructor(el) {
        el = this.isElementNode(el) ? el : document.querySelector(el)
        const fragment = this.node2Fragment(el)


        this.compileElement(el)
        el.appendChild(fragment)
    }

    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        let child
        while(child = el.firstChild){
            console.log(child)
            fragment.appendChild(child)
        }
        return fragment
    }

    isElementNode(node){
        return node.nodeType == 1;
    }

    compileElement(el) {
        [].slice.call(el.childNodes).forEach(function (item) {
            if(isElementNode(item)){

            }else if(isTextNode(item)){

            }else{

            }
        })
    }
}

