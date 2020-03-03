let fs = require('fs')
fs.readFile('./03_stream.txt',(err, data) => {
    if(!err) {
        console.log('二进制默认转为16进制显示的data = ', data)
        console.log('转为人类可以看懂的data = ', data.toString())
    }
})
// 向文件中写数据
fs.writeFile('./03_stream.txt', '我是用fs模块的writeFile函数写进来的数据', (err) => {
    if(!err) {
        console.log('写入成功')
    }
})

var obj = {
    A: () => {},
    B: () => {},
    C: () => {}
}

var obj = function () {}
obj.A = function () {}

var obj = function() {
    return {
        A: () => {},
        B: () => {},
        C: () => {}
    }
}
var newObj1 = obj()
console.log(newObj1.A())
console.log(newObj1.B())
console.log(newObj1.C())

var Obj = function() {
    this.A = function () {}
    this.B = function () {}
    this.C = function () {}
}

var newObj2 = new Obj()
newObj2.A()

var Obj = function() {}
Obj.prototype.A = function() {}
Obj.prototype.B = function() {}
Obj.prototype.C = function() {}

var Obj = function() {}
Obj.prototype = {
    constructor: Obj,
    A: function() {
        // ...logic
        return this
    },
    B: function() {
        // ...logic
        return this
    },
    C: function() {
        // ...logic
        return this
    }
}

Function.prototype.A = function() {...}

// 使用
var f = function() {}
f.A()

// 或者类调用形式
var f = new Function()
f.A()

Function.prototype.addMethod = function(name, fn) {
    this[name] = fn
}

var f = function() {} // 返回的不是真正意义上的对象
f.addMethod('A', function() {})
f.addMethod('B', function() {})
f.addMethod('C', function() {})

Function.prototype.addMethod = function(name, fn) {
    this.prototype[name] = fn
}

var Methods = function() {} // 返回的是一个真正的对象
Methods.addMethod('A', function() {})
Methods.addMethod('B', function() {})
Methods.addMethod('C', function() {})

var m = new Methods()
m.A()
m.B()

Function.prototype.addMethod = function(name, fn) {
    this.prototype[name] = fn
    return this
}

var Methods = function() {} // 返回的是一个真正的对象
Methods.addMethod('A', function() {})
Methods.addMethod('B', function() {})
Methods.addMethod('C', function() {})

var m = new Methods()
m.A().B()