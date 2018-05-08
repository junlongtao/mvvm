import { Compile } from './Compile'
import { observe, Dep } from "./Observer";

export class MVVM {

    constructor(options) {
        this._init(options)
    }

    _init(options) {
        this.$options = options
        this.$data = options.data
        Object.keys(this.$data).forEach(key => {
            this._proxy(key);
        });
        //for (let key in options.computed) {
        //    this.proxyData(key, options.computed)
        //    this[key] = options.computed[key]
        //}
        const el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        new Compile(el || document.body, this)
    }

    _proxy(key) {
        const dep = new Dep(key)
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                console.log(this)
                if (Dep.target) {
                    Dep.target.addToDep(dep)
                    // Dep.target = null
                }
                return this.$data[key];
            },
            set: function proxySetter(newVal) {
                this.$data[key] = newVal;
                dep.notify()
            }
        });

        observe(this.$data[key])
    }
}

function createClass(){
    return function Component(options){
        console.log('---------------------')
        this._init(options)
    }
}

MVVM.extend = function(options){
    const component = createClass()
    component.prototype = MVVM.prototype
    component.prototype.constructor = component
    component._options = options
    return component
}

//
// function observe(data) {
//     if (!data || typeof data !== 'object') {
//         return;
//     }
//     // 取出所有属性遍历
//     Object.keys(data).forEach(function(key) {
//         defineReactive(data, key, data[key], );
//     });
// };
//
// function defineReactive(data, key, val, cb) {
//     observe(val); // 监听子属性
//     Object.defineProperty(data, key, {
//         enumerable: true, // 可枚举
//         configurable: false, // 不能再define
//         get: function() {
//             return val;
//         },
//         set: function(newVal) {
//             console.log(newVal)
//             val = newVal;
//
//             console.log(window.vm)
//         }
//     });
// }
