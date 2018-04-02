import Compile from './Compile'

export default class MVVM {

    constructor(options) {
        const data = options.data || {}
        for (let key in data) {
            this[key] = data[key]
        }
        for (let key in options.computed){
            this[key] = options.computed[key]
        }
        new Compile(options.el || document.body, this)
    }
}