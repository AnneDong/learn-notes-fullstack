// new运算的过程
/**
 * 1、创建一个空对象；
 * 2、该空对象的原型指向构造函数（链接原型）：将构造函数的 prototype 赋值给对象的 __proto__属性；
 * 3、绑定 this：将对象作为构造函数的 this 传进去，并执行该构造函数；
 * 4、返回新对象：如果构造函数返回的是一个对象，则返回该对象；否则（若没有返回值或者返回基本类型），返回第一步中新创建的对象；
 */
// var Person = function(name) {
//     this.name = name
//     console.log('name is ', this.name)
// }
// Person.prototype.getName = function() {
//     return this.name
// }
// var objectFactory = function() {
//     // 1、创建一个空对象
//     var obj = new Object()
//     console.log('before shift arguments = ',arguments)
//     // 获取构造函数,shift是删除并返回第一个数组元素
//     Constructor = [].shift.call(arguments)
//     console.log('after shift arguments = ', arguments)
//     console.log(`Constructor = ${Constructor}`)
//     // 2、该空对象的原型指向构造函数： 将构造函数的prototype 赋值给空对象的 __proto__属性；
//     obj.__proto__ = Constructor.prototype
//     // 3、将空对象作为构造函数的this传进去，并执行该构造函数
//     var ret = Constructor.apply(obj, arguments)
//     // 4、返回新对象：如果构造函数返回的是一个对象，则返回该对象；否则（若没有返回值或者返回基本类型），返回第一步中新创建的对象；
//     return typeof ret == 'object' ? ret : obj
// }
// var a = objectFactory(Person, 'yandong')
// console.log('执行后的name = ', a.name)

// // // call, apply, bind的区别
// var a = {value: 1}
// function getValue(name, age) {
//     console.log('arguments in getValue = ', arguments)
//     console.log(name, age)
//     console.log('getValue this = ', this)
//     console.log(this.value)
// }
// // getValue.call(a,'yandong1', 17)
// // let bindFoo = getValue.bind(a, 'testBind', 45)
// // console.log('bindFoo = ',bindFoo)
// // bindFoo()
// // getValue.apply(a,['yandong2', 18])
// // var returnedFunc = getValue.bind(a,'yandong3', 19)
// // console.log(returnedFunc)
// // returnedFunc()

// // 手写模拟call方法的思想
// /**
//  * call方法思想：改变this指向，让新的对象可以执行这个方法
//  * 实现思路：
//  * 1、给新的对象添加一个函数（方法），并让this（也就是当前绑定的函数）指向这个函数
//  * 2、执行这个函数
//  * 3、执行完以后删除这个方法
//  * 4、可以将执行结果返回
//  */
// // Function.prototype.myCall = function(funcCtx) {
// //     console.log('funcCtx = ',funcCtx)
// //     console.log('this = ',this)
// //     if(typeof this != 'function') {
// //         throw new TypeError('Erorr')
// //     }
// //     let ctx = funcCtx || global
// //     console.log('arguemnets = ', arguments)
// //     let args = [...arguments].slice(1)
// //     console.log(`args = ${args}`)

// //     ctx.fn = this
// //     console.log('ctx.fn = ', ctx.fn)
// //     var result = ctx.fn(...args)
// //     delete ctx.fn
// //     return result
// // }
// // getValue.myCall(a,'test', 20)

// // apply
// // Function.prototype.myApply = function(funcCtx) {
// //     console.log(this)
// //     if(typeof this != 'function') {
// //         throw new TypeError('Erorr')
// //     }
// //     let ctx = funcCtx || global

// //     ctx.fn = this
// //     console.log('arguemnets = ', arguments)
// //     let result
// //     if(arguments[1]) {
// //         result = ctx.fn(...arguments[1])
// //     } else {
// //         result = ctx.fn()
// //     }
// //     delete ctx.fn
// //     return result
// // }
// // getValue.myApply(a, ['eo', 50])

// //bind实现
// /**
//  * 实现思想：
//  * 1、返回一个函数，其他与call, apply类似
//  * 2、如果返回的函数作为构造函数，bind时指定的 this 值会失效，但传入的参数依然生效。
//  */
Function.prototype.myBind = function(funcCtx) {
    let ctx = funcCtx || global
    console.log(this)
    let _this = this
    let args = [...arguments].slice(1)
    // 作为构造函数使用
    let Fbind = function() {
        let self = this instanceof Fbind ? this : ctx
        return _this.apply(self,args.concat(...arguments))
    }
    let f = function() {}
    f.prototype = this.prototype
    Fbind.prototype = new f()
    return Fbind
}


var value = 2
var foo = {
    value: 1
}
function bar(name, age) {
    this.habbit = 'shopping'
    console.log('bar this.value = ', this.value)
    console.log(name, age)
}
bar.prototype.friend = 'shuaige'
var bindFoo = bar.myBind(foo, 'testbind',111)
console.log(bindFoo)
// // 返回的函数直接调用
// // bindFoo()
// // 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。
// var obj = new bindFoo('18')
// console.log('obj = ', obj)
// console.log(obj.friend)
// console.log(obj.habbit)

// // 对象b
// var b = {name: 'even'}
// function A() {}
// A.prototype = b // 对象a的构造器的原型指向对象b, 实现a继承b

// var a = new A() // 创建对象a
// console.log('a = ', a) // a也有b对象的name属性了

// 闭包实现
// var extend = function() {
//     var value = 0
//     return {
//         call: function() {
//             value++
//             console.log(value)
//         }
//     }
// }
// var test = extend()
// test.call()
// test.call()
// 面向对象实现
// var extend = {
//     value: 0,
//     call: function() {
//         this.value++
//         console.log(this.value)
//     }
// }
// extend.call()
// 面向对象实现2
// var Extend = function() {
//     console.log('this = ', this)
//     this.value = 0
// }
// Extend.prototype.call = function() {
//     console.log('proto this = ', this)
//     this.value++
//     console.log('value = ', this.value)
// }
// var extend = new Extend()
// extend.call()
// extend.call()

// 对象版本的命令模式
// 命令接收者
// var commandReceiver = {
//     open: function() {
//         console.log('打开电视')
//     },
//     close: function() {
//         console.log('关闭电视')
//     }
// }
// // 命令发起者
// var CommandReporter = function(receiver) {
//     this.receiver = receiver
// }
// // 命令执行定义
// CommandReporter.prototype.excute = function() {
//     this.receiver.open()
// }
// CommandReporter.prototype.undo = function() {
//     this.receiver.close()
// }
// // 实例化，将命令接收者植入命令执行者定义内
// var example = new CommandReporter(commandReceiver)
// console.log('axample = ', example)

// // 命令执行者定义
// var setCommand = function(reporter) {
//     reporter.excute()
//     reporter.undo()
// }
// // 执行命令
// setCommand(example)

// 另一个对象版本的命令模式
// var orderReceiver = {
//     add: function() {
//         console.log('添加订单')
//     }
// }
// var orderReporter = function(receiver) {
//     this.receiver = receiver
// }
// orderReporter.prototype.addOrder = function() {
//     this.receiver.add()
// }

// var order = new orderReporter(orderReceiver)
// console.log('order = ',order)

// var createOrder = function(reporter) {
//     reporter.addOrder()
// }
// createOrder(order)

// 闭包版本的命令模式
// 命令接收者
// var orderReceiver = {
//     add: function() {
//         console.log('add order')
//     }
// }
// // 命令发起者定义
// var orderReporter = function(receiver) {
//     var addOrder = function() {
//         receiver.add()
//     }
//     return {
//         addOrders: addOrder
//     }
// }
// // 将命令接收者注入命令发起者内
// var closureReporter = orderReporter(orderReceiver)

// // 命令执行者定义
// var createOrder = function(reporter) {
//     reporter.addOrders()
// }
// // 执行命令
// createOrder(closureReporter)

// function Person(name) {
//     this.name = name
// }
// function Mother() {

// }
// Mother.prototype = {
//     age: 18,
//     home: ['beijing', 'shanghai']
// }
// Person.prototype = new Mother()

// var p1 = new Person('jack')
// console.log(p1)
// console.log(p1.age)
// console.log(p1.home)
// p1.age = 23
// console.log(p1.age)
// console.log(new Mother().age)
// Person.prototype.lastName = 'Jin'
// console.log(p1.lastName)

// 闭包
// var makeCounter = function() {
//     var privateCounter = 0
//     function counter(val) {
//         privateCounter += val
//     }
//     function increment() {
//         counter(1)
//     }
//     function decrement() {
//         counter(-1)
//     }
//     function getValue() {
//         return privateCounter
//     }
//     return {
//         increment,
//         decrement,
//         value: getValue
//     }
// }
// var obj1 = makeCounter()
// obj1.increment()
// console.log(obj1.value())
// var obj2 = makeCounter()
// console.log(obj2.value())