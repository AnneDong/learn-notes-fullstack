###fs.Dir类
代表目录流的类， 由 fs.opendir()、fs.opendirSync() 或 fsPromises.opendir() 创建。

###fs.Dirent类
由fs.readdir()或者fs.readdirSync()创建。
```javascript
fs.readdir('./resources', (err, res) => {
  console.log(res) // 这是一个数组，数组元素是resources文件夹下的每个文件
  for (let dirent of res) {
    console.log(dirent) // resources文件夹下的每个文件
  }
})
```

