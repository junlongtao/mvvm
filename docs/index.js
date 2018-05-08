import { MVVM } from '../src/MVVM'

var MyComponent = MVVM.extend({
    template: `<p>{{message}} <em> kkkkkkk</em></p>`,
})

var ButtonCounter = MVVM.extend({
    template: `<button v-on:click="this.count++">You clicked me {{count}} times</button>`,
    data: {
        count: 0
    }
})

var vm = new MVVM({
    el: '#mvvm-app',
    data: {
        visible: true,
        someStr: 'hello mvvm!',
        className: 'btn',
        htmlStr: '<span style="color: #f00">red</span>',
        child: {
            someStr: 'World!xxxxxx'
        },
        todos: [
            {text: '学习javascript'},
            {text: '学习vue'},
            {text: '整个牛项目'},
            {text: '快快快快快'}
        ]
    },
    computed: {
        getHelloWorld: function () {
            return this.someStr + this.child.someStr;
        }
    },
    methods: {
        clickBtn: function (e) {
            this.someStr = this.someStr.split('').reverse().join('')
        },
        onToggleClick: function (e) {
            this.visible = !this.visible
        }
    },
    components: {
        'my-component': MyComponent,
        'button-counter': ButtonCounter
    }
})
// vm.$watch('child.someStr', function () {
//     console.log(arguments)
// })
