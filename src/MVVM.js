import Compile from './Compile'

export default class MVVM {

    constructor(options) {
        for (let key in options.data) {
            this.proxyData(key, options.data)
        }
        //for (let key in options.computed) {
        //    this.proxyData(key, options.computed)
        //    this[key] = options.computed[key]
        //}
        this.methods = options.methods
        new Compile(options.el || document.body, this)
    }

    proxyData(key, data) {
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: function() {
                return data[key];
            },
            set: function(value) {
                console.log(value)
                this[key] = value;
            }
        });
    }
}