// import jquery from 'jquery'
// import moment from 'moment'
// let r = moment().endOf('day').fromNow();
// console.log(r)
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')

// import React from 'react' //直接找动态链接库
// import {render} from 'react-dom'
// render(<h1>jsx</h1>, window.root)

//23节
// let sum = (a,b) =>  a + b + 'sum'
// let minus = (a,b) =>  a - b + 'minus'
// export default {
//     sum,
//     minus
// }

//25节
// import './a'
// import './b'
// console.log('index.js')

// import $ from 'jquery'
// console.log($)

//26节， 点击一个按钮再去加载某个js
// let button = document.createElement('button')
// button.innerHTML = 'click';
// button.addEventListener('click', () => {
//     import('./source').then(data => {
//         console.log(data.default)
//     })
// })
// document.body.appendChild(button)

//27节 热更新
// import str from './source'
// console.log('str = ', str)
// if(module.hot) {
//     module.hot.accept('./source.js',()=> {
//         console.log('file updated')
//         let str = require('./source')
//         console.log('str2 = ', str.default)
//     })
// }

// 28节 tapable
// webpack源码中发布订阅者模式的实现
// 同步的tapable
// SyncHook
// let {SyncHook} = require('tapable')
// class Lesson {
//     constructor() {
//         this.hooks = {
//             arch: new SyncHook(['name']),
//         }
//     }
//     tap() { //注册监听函数
//         this.hooks.arch.tap('node', function(name) {
//             console.log('node', name)
//         });
//         this.hooks.arch.tap('react', function(name) {
//             console.log('react', name)
//         })
//     }
//     start() {
//         this.hooks.arch.call('anne')
//     }
// }
// let l  = new Lesson();
// l.tap(); // 注册事件
// l.start(); //启动钩子后，可以自动调用注册的方法

// class SyncHook { //实现同步钩子
//     constructor(args) {
//         this.hooks = []
//     }
//     tap(name, task) {
//         this.hooks.push(task);
//     }
//     call(...args) {
//         this.hooks.forEach((task) => {
//             task(...args)
//         })
//     }
// }
// let hook = new SyncHook(['name'])
// hook.tap('react', function(name) {
//     console.log('react', name)
// })
// hook.tap('node', function(name) {
//     console.log('node', name)
// })
// hook.call('anne')

// SyncBailHook
// let {SyncBailHook} = require('tapable')
// class Lesson {
//     constructor() {
//         this.hooks = {
//             arch: new SyncBailHook(['name']),
//         }
//     }
//     tap() { //注册监听函数
//         this.hooks.arch.tap('node', function(name) {
//             console.log('node', name)
//             return '想停止学习' //只要不是返回undefined, 就不会往下继续执行
//         });
//         this.hooks.arch.tap('react', function(name) {
//             console.log('react', name)
//         })
//     }
//     start(name) {
//         this.hooks.arch.call(name)
//     }
// }
// let l  = new Lesson();
// l.tap(); // 注册事件
// l.start('anne2'); //启动钩子后，可以自动调用注册的方法

// class SyncBailHook { //同步执行事件过程中，中断
//     constructor(args) {
//         this.hooks = []
//     }
//     tap(name, task) {
//         this.hooks.push(task);
//     }
//     call(...args) {
//         // 更改这里的逻辑
//         let ret; //当前任务的返回值
//         let index = 0; //当前要先执行第一个
//         do{
//             ret = this.hooks[index++](...args);
//         }while(ret === undefined && index < this.hooks.length)
//     }
// }
// let hook = new SyncBailHook(['name'])
// hook.tap('react', function(name) {
//     console.log('react', name)
//     return '停止向下学习'
// })
// hook.tap('node', function(name) {
//     console.log('node', name)
// })
// hook.call('anne')

// // SyncWaterfallHook
// // let {SyncWaterfallHook} = require('tapable')
// // class Lesson {
// //     constructor() {
// //         this.hooks = {
// //             arch: new SyncWaterfallHook(['name']),
// //         }
// //     }
// //     tap() { //注册监听函数
// //         this.hooks.arch.tap('node', function(name) {
// //             console.log('node', name)
// //             return 'node学的还不错' //只要不是返回undefined, 结果会传给下一个任务
// //         });
// //         this.hooks.arch.tap('react', function(data) {
// //             console.log('react', data)
// //         })
// //     }
// //     start(name) {
// //         this.hooks.arch.call(name)
// //     }
// // }
// // let l  = new Lesson();
// // l.tap(); // 注册事件
// // l.start('anne2'); //启动钩子后，可以自动调用注册的方法

// class SyncWaterfallHook { //同步执行事件过程中，上一次的结果作为下一次任务执行的参数接收
//     constructor(args) {
//         this.hooks = []
//     }
//     tap(name, task) {
//         this.hooks.push(task);
//     }
//     call(...args) {
//         // 更改这里的逻辑 
//         // 先取出第一个执行，再把执行的结果传给下一个任务
//         // 第一次的任务必须先执行
//         let [first,...others] = this.hooks;
//         let ret = first(...args);
//         others.reduce((paramPrev, cbNext) => {
//             return cbNext(paramPrev)
//         },ret)
//     }
// }
// let hook = new SyncWaterfallHook(['name'])
// hook.tap('react', function(name) {
//     console.log('react', name)
//     return 'react ok' //这个返回值是下一个任务的接收值
// })
// hook.tap('node', function(data) {
//     console.log('node', data)
//     return 'node ok'
// })
// hook.tap('webpack', function(data) {
//     console.log('webpack', data)
// })
// hook.call('anne')

// SyncLooplHook
// 同步执行，遇到某个不返回undefined的任务会多次执行
// let {SyncLoopHook} = require('tapable')
// class Lesson {
//     constructor() {
//         this.index = 0;
//         this.hooks = {
//             arch: new SyncLoopHook(['name']),
//         }
//     }
//     tap() { //注册监听函数
//         this.hooks.arch.tap('node', (name) => {
//             console.log('node', name)
//             return ++this.index === 3 ? undefined : '继续学'
//             // return 'node学3遍再执行下一个' //只要不是返回undefined, 结果会传给下一个任务
//         });
//         this.hooks.arch.tap('react', (data) => {
//             console.log('react', data)
//         })
//     }
//     start(name) {
//         this.hooks.arch.call(name)
//     }
// }
// let l  = new Lesson();
// l.tap(); // 注册事件
// l.start('anne2'); //启动钩子后，可以自动调用注册的方法

// class SyncLoopHook { //同步执行事件过程中，中断
//     constructor(args) {
//         this.hooks = []
//     }
//     tap(name, task) {
//         this.hooks.push(task);
//     }
//     call(...args) {
//         // 更改这里的逻辑 
//         // 至少走一次任务， do...while
//         // 每个任务都要执行
//         this.hooks.forEach((task) => {
//             let ret;
//             do{
//                 ret = task(...args)
//             }while(ret != undefined)
//         })
//     }
// }
// let hook = new SyncLoopHook(['name'])
// let total = 0;
// hook.tap('react', function(name) {
//     console.log('react', name)
//     return ++total === 3 ? undefined : '继续学'
// })
// hook.tap('node', function(name) {
//     console.log('node', name)
// })
// hook.tap('webpack', function(name) {
//     console.log('webpack', name)
// })
// hook.call('anne')

// 异步的tapable
// 异步并行钩子AsyncParallelHook
// let {AsyncParallelHook} = require('tapable')
// class Lesson {
//     constructor() {
//         this.hooks = {
//             arch: new AsyncParallelHook(['name']),
//         }
//     }
//     tap() { //注册监听函数
//         this.hooks.arch.tapAsync('node', (name, cb) => {
//             setTimeout(() => {
//                 console.log('node');
//                 cb(); //每个任务的回调cb都要执行，才会执行最后的end
//             }, 1000)
//         });
//         this.hooks.arch.tapAsync('react', (name, cb) => {
//             setTimeout(() => {
//                 console.log('react');
//                 cb(); // 注释掉任何一个，最后的end回调都不会执行
//             }, 1000)
//         })
//     }
//     start(name) {
//         this.hooks.arch.callAsync(name,() => {
//             console.log('end')
//         })
//     }
// }
// let l  = new Lesson();
// l.tap(); // 注册事件
// l.start('anne2'); //启动钩子后，可以自动调用注册的方法

// // 实现AsyncParallelHook, 非Promise实现
// class AsyncParallelHook { //同步执行事件过程中，中断
//     constructor(args) {
//         this.hooks = []
//     }
//     tapAsync(name, task) {
//         this.hooks.push(task);
//     }
//     callAsync(...args) {
//         // 更改这里的逻辑 
//         // args包括参数以及回调函数
//         let finalCallback = args.pop(); //拿到并行任务都执行完毕之后触发的回调函数
//         let index = 0;
//         let done = () =>  { // 类似Promise.all
//             index++;
//             if(index == this.hooks.length) {
//                 finalCallback()
//             }
//         }
//         this.hooks.forEach((task) => {
//             task(...args, done);
//         })
//     }
// }
// let hook = new AsyncParallelHook(['name'])
// let total = 0;
// hook.tapAsync('react', function(name, cb) {
//     setTimeout(() => {
//         console.log('react', name);
//         cb();
//     }, 1000)
// })
// hook.tapAsync('node', function(name, cb) {
//     setTimeout(() => {
//         console.log('node', name);
//         cb();
//     }, 1000)
// })
// hook.callAsync('anne',() => {
//     console.log('end')
// })

// AsyncParallelHook 使用Promise注册和调用
// let {AsyncParallelHook} = require('tapable')
// class Lesson {
//     constructor() {
//         this.hooks = {
//             arch: new AsyncParallelHook(['name']),
//         }
//     }
//     tap() { //注册监听函数
//         this.hooks.arch.tapPromise('node', (name) => {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     console.log('node');
//                     resolve(); // 这里就不调用回调了，直接调用resolve
//                     // cb(); //每个任务的回调cb都要执行，才会执行最后的end
//                 }, 1000)
//             })
//         });
//         this.hooks.arch.tapPromise('react', (name) => {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     console.log('react');
//                     resolve(); // 这里就不调用回调了，直接调用resolve
//                     // cb(); //每个任务的回调cb都要执行，才会执行最后的end
//                 }, 1000)
//             })
//         })
//     }
//     start(name) {
//         this.hooks.arch.promise(name).then(() => {
//             console.log('end')
//         })
//     }
// }
// let l  = new Lesson();
// l.tap(); // 注册事件
// l.start('anne2'); //启动钩子后，可以自动调用注册的方法

// 总结
/**
 * tapable库中有三种注册方法
 * tap 同步注册, 注册用的是tap, 对应的调用是call
 * tapAsync(注册时多一个cb参数), 注册用的是tapAsync, 对应的调用是callAsync
 * tapPromise(注册的是promise), 注册用的是tapPromise, 对应的调用是promise
 */

 // // 实现AsyncParallelHook, Promise实现
class AsyncParallelHook { //同步执行事件过程中，中断
    constructor(args) {
        this.hooks = []
    }
    tapPromise(name, task) {
        this.hooks.push(task);
    }
    promise(...args) {
        // 更改这里的逻辑 
        // 把任务执行完毕之后返回的promise存起来
        let tasks = this.hooks.map((task) => {
            return task(...args)
        })
        return Promise.all(tasks)
    }
}
let hook = new AsyncParallelHook(['name'])
let total = 0;
hook.tapPromise('react', function(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000)
    })
})
hook.tapPromise('node', function(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000)
    })
})
hook.promise('anne').then(() => {
    console.log('end')
})