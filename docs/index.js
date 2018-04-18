import { MVVM } from '../src/MVVM'

var vm = new MVVM({
    el: '#mvvm-app',
    data: {
        visible: true,
        someStr: 'hello',
        className: 'btn',
        htmlStr: '<span style="color: #f00">red</span>',
        child: {
            someStr: 'World!xxxxxx'
        },
        todos: [
            {text: '学习javascript'},
            {text: '学习vue'},
            {text: '整个牛项目'}
        ]
    },
    computed: {
        getHelloWorld: function () {
            return this.someStr + this.child.someStr;
        }
    },
    methods: {
        clickBtn: function (e) {
            var randomStrArr = ['childOne', 'childTwo', 'childThree']
            this.child.someStr = Math.random()*10000
        },
        onToggleClick: function (e) {
            this.visible = !this.visible
        }
    }
})
// vm.$watch('child.someStr', function () {
//     console.log(arguments)
// })