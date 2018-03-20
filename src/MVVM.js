import Compile from './Compile'

export default class MVVM {

    constructor(options){
        new Compile(options.el || document.body, this)
    }
}