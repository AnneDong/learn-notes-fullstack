###Node.js读取文件
```
// hello.js
var fs = require('fs') // 引入文件系统
fs.readFile('相对于当前文件的路径', (error, data) => {
  console.log(data) // 二进制的16进制数据
  if (error) {
    console.log('读取文件失败)
    return
  }
  console.log(data.toString())
})
```
执行命令： node hello.js