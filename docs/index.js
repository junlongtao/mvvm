import MVVM from '../src/MVVM'

var vm = new MVVM({
    el: '#mvvm-app',
    data: {
        someStr: 'hello',
        className: 'btn',
        htmlStr: '<span style="color: #f00">red</span>',
        child: {
            someStr: 'World!xxxxxx'
        }
    },
    computed: {
        getHelloWorld: function () {
            return this.someStr + this.child.someStr;
        }
    },
    methods: {
        clickBtn: function (e) {
            var randomStrArr = ['childOne', 'childTwo', 'childThree']
            this.child = {
                someStr: Math.random()*1000
            }
        }
    }
})
// vm.$watch('child.someStr', function () {
//     console.log(arguments)
// })