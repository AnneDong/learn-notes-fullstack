###创建http服务器

- 我们可以使用node很轻松的创建一个http服务器
- node提供了一个核心模块http模块，用来创建编写服务器的

####1、加载http模块
`const http = require('http')`

####2、创建web服务器， 返回server实例
`const server = http.createServer()`

####3、服务器要干嘛？(监听request事件，设置响应处理函数)
  - 提供服务： 对数据的服务
  - 接收请求
  - 处理请求

**当服务器接收到客户端的请求时，会自动触发服务器的 request 事件，然后执行回调**
```node
// 当服务器接收到客户端的请求时，会自动触发服务器的 request 事件，然后执行回调
// response.write()可以写多次，但最后一定要调用response.end()方法，结束响应，不然浏览器会一直在等待响应状态
// 也可以一边end,一边发送数据，来简写
// 响应的内容只能是字符串或者二进制数据
// response.end('hello nodejs')
server.on('request', (request, response) => {
  console.log('收到客户端的请求了')
  // 服务端发送的数据，默认是 utf-8 编码的内容，
  // 但是浏览器在不知道服务器响应内容编码的情况下，会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是gbk, 所以乱码
  // 解决办法就是我告诉浏览器发送的内容是什么编码的
  // 解决中文乱码的问题，必须在写数据之前设置
  // 在http协议中， Content-Type就是用来告知对方发送内容是什么类型
  // text/plain表示是普通文本
  response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  response.write('hello 我是返回的数据')
  response.write('node.js')
  response.end()
})

```

####4、绑定端口号，启动服务器

```node
server.listen('3000', () => {
  console.log('服务器启动成功， 可以通过 http://127.0.0.1:3000/ 访问浏览器')
})
```
![image.png](https://upload-images.jianshu.io/upload_images/3077057-4315d8e77550774a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/3077057-f7e2de9547a8dada.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

一般我们从访问一个url，然后经过域名解析（dns解析），将域名解析为IP地址，一个服务对应一个IP地址，而端口号就是我们用来寻找应用程序的标识，比如QQ, 微信等，他们的端口号是不同的。所以需要绑定端口号。