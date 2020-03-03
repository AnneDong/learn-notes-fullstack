###fs.ReadStream类
由fs.createReadStream(path[,options])

- createReadStream(path,option):该用来打开一个可读的文件流，它返回一个fs.ReadStream对象
```javascript
@params:path指定文件的路径
@params:options可选,是一个JS对象，可以指定一些选项如：
  option={

    //指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
    flags: 'r',

    //指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
    encoding: 'utf8',

    // fd属性默认为null，
    // 当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。
    // 另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
    fd: null,

    mode: 0666,

    //autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
    autoClose: true
  }
 
```

```javascript
const readStream = fs.createReadStream('./01-write.js', {encoding:'utf8'})
console.log('所读取的文件路径 = ', readStream.path)
readStream.on('open', (fd) => {
  console.log('文件打开', fd)
})
readStream.on('ready', () => {
  console.log('文件已就绪')
})
readStream.on('data', (chunk) => {
  console.log('读取文件数据 = ', chunk)
  console.log('已读取的字节数 = ', readStream.bytesRead)
})
readStream.on('end', () => {
  console.log('文件读取已完成')
})
readStream.on('close', () => {
  console.log('文件已关闭')
})
```

###fs.WriteStream类
由fs.createWriteStream(path[,options])

```javascript
@params:path指定文件的路径
@params:options可选,是一个JS对象，可以指定一些选项如：
  option={

    //指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
    flags: 'r',

    //指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
    encoding: 'utf8',

    // fd属性默认为null，
    // 当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。
    // 另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
    fd: null,
    
    mode: 0666,

    //autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
    autoClose: true
  }
 
```

```javascript
const writeStream = fs.createWriteStream('./test.js', {encoding:'utf8'})
console.log('所写数据的文件路径 = ', writeStream.path)
writeStream.on('open', (fd) => {
  console.log('文件打开', fd)
})
writeStream.on('finish', () => {
  console.log('写入已完成')
  console.log('读取文件内容：', fs.readFileSync('./test.js', 'utf-8'))
  console.log('writeStream = ', writeStream)
})
writeStream.on('data', (chunk) => {
  console.log('读取文件数据 = ', chunk)
  console.log('已读取的字节数 = ', writeStream.bytesRead)
})
writeStream.on('end', () => {
  console.log('文件读取已完成')
})
writeStream.on('close', () => {
  console.log('文件已关闭')
})

writeStream.write('这是测试写入的数据内容')
writeStream.end()

```

类似的api还有很多，详细请查看官方文档fs文件系统 http://nodejs.cn/api/fs.html