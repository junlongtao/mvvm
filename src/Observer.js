


export class Observer{

    constructor(obj){
        def(obj, '__ob__', this, false)
        this.dep = new Dep()
        const keys = Object.keys(obj)
        for(let i=0, len=keys.length; i<len; i++){
            const key = keys[i]
            this.defineReactive(obj, key, obj[key])
        }
    }

    defineReactive(obj, key, val){
        const dep = new Dep(key)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function(){
                if(Dep.target){
                    Dep.target.addToDep(dep)
                }
                return val
            },
            set: function(newVal){
                val = newVal
                dep.notify()
            }
        })
    }
}

export function observe(data){
    if (!data || typeof data !== 'object') {
        return;
    }
    if(data.hasOwnProperty('__ob__') && data.__ob__ instanceof Observer){
        return data.__ob__
    }
    return new Observer(data)
}

let id = 0
export class Dep {
    constructor(key) {
        this.key = key
        this.id = id++
        this.subs = []
        console.log(this)
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(item => {
            item.update()
        })
    }
}

/**
 * Define a property.
 */
export function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}
