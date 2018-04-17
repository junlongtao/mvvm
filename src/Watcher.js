import { Dep } from './Observer'

export class Watcher {

    constructor(vm, exp, cb) {
        this.vm = vm
        this.cb = cb
        this.deps = {}

        Dep.target = this
        this.value = this.getVmValue(vm, exp)
    }

    addToDep(dep) {
        if (!this.deps.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.deps[dep.id] = dep;
        }
    }

    update() {
        this.cb.call(this.vm)
    }

    getVmValue(vm, exp) {
        let res = vm
        exp.split('.').map(item => {
            res = res[item]
        })
        return res
    }
}