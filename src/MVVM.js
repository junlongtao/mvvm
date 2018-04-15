import Compile from './Compile'

export default class MVVM {

    constructor(options) {
        this._data = options.data
        for (let key in this._data) {
            this.proxyData(key)
        }
        //for (let key in options.computed) {
        //    this.proxyData(key, options.computed)
        //    this[key] = options.computed[key]
        //}
        this.methods = options.methods
        new Compile(options.el || document.body, this)
    }

    proxyData(key) {
        const dep = new Dep()
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                if(Dep.target){
                    dep.addSub(Dep.target)
                    Dep.target = null
                }
                return this._data[key]
            },
            set: function (value) {
                console.log(value)
                this._data[key] = value
                dep.notify()
            }
        });
    }
}

export class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(item => {
            item.call()
        })
    }
}