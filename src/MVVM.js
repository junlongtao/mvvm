import Compile from './Compile'

export default class MVVM {

    constructor(options) {
        this._watchers = {}
        this._data = options.data
        Object.keys(this._data).forEach(key => {
            this._proxy(key);
        });
        //for (let key in options.computed) {
        //    this.proxyData(key, options.computed)
        //    this[key] = options.computed[key]
        //}
        this.methods = options.methods
        new Compile(options.el || document.body, this)

    }

    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return this._data[key];
            },
            set: function proxySetter(newVal) {
                this._data[key] = newVal;

                var watcher = this._watchers[key]
                if(watcher){
                    watcher.call(this)
                }
            }
        });

        observe(this._data[key])
    }
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key], );
    });
};

function defineReactive(data, key, val, cb) {
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log(newVal)
            val = newVal;

            console.log(window.vm)
        }
    });
}
//
// export class Dep {
//     constructor() {
//         this.subs = []
//     }
//
//     addSub(sub) {
//         this.subs.push(sub)
//     }
//
//     notify() {
//         this.subs.forEach(item => {
//             item.call()
//         })
//     }
// }