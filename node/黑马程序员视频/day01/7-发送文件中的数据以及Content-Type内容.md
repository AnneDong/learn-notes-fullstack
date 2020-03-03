###发送文件中的数据以及Content-Type内容
文件后缀名对应的Content-Type查询： https://tool.oschina.net/commons

```javascript
// 1、加载http模块
const http = require('http')
const fs = require('fs')

// 2、创建web服务器， 返回server实例
const server = http.createServer()

// 3、当服务器接收到客户端的请求时，会自动触发服务器的 request 事件，然后执行回调
// response.write()可以写多次，但最后一定要调用response.end()方法，结束响应，不然浏览器会一直等待
server.on('request', (request, response) => {
  if (request.url === '/') {
    fs.readFile('./resources/index.html', (error, data) => {
      if (error) {
        response.setHeader('Content-Type', 'text/plain;charset=utf-8;')
        console.log('文件读取失败，请稍后再试')
      } else {
        // data默认是二进制，可以通过.toString()方法转化为我们可以看懂的数据
        // res.end()支持两种数据格式，一种是二进制，一种是字符串
        response.setHeader('Content-Type', 'text/html;charset=utf-8;')
        response.end(data)
      }
    })
  } else if (request.url === '/a') {
    fs.readFile('./resources/01.png', (error, data) => {
      if (error) {
        response.setHeader('Content-Type', 'text/plain;charset=utf-8;')
        console.log('文件读取失败，请稍后再试')
      } else {
        // data默认是二进制，可以通过.toString()方法转化为我们可以看懂的数据
        // res.end()支持两种数据格式，一种是二进制，一种是字符串
        // 图片就不需要指定编码了, 因为我们所说的编码是指： 字符编码
        response.setHeader('Content-Type', 'image/png;')
        response.end(data)
      }
    })
  }
})

// 4、绑定端口号，启动服务器
server.listen('3000', () => {
  console.log('服务器启动成功， 可以通过 http://127.0.0.1:3000/ 访问浏览器')
})
```