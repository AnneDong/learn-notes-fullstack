###Node.js写文件
```
var fs = require('fs')
fs.writeFile('要写入数据的文件路径', '数据', (error) => {
  if (error) {
    console.log('写入失败)
  } else {
    console.log(’写入成功‘)
  }
})
```
**注意：**
如果你往已经存在的数据文件中写入数据，那么按照上述代码，新写入的数据会覆盖原有文件的数据，也就是先清空原先文件里的内容，然后再写入。

可使用fs.createWriteStream(path[,options])来接着在已有文件后写入数据，而不是覆盖，具体参见API。