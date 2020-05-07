

###fs.FSWatcher 类
调用fs.watch()方法会返回这个对象

可不提供 filename 参数，这取决于操作系统的支持。 如果提供了 filename，则当调用 fs.watch() 并将其 encoding 选项设置为 'buffer' 时， filename 将是一个 Buffer，否则 filename 将是 UTF-8 字符串。
```javascript
// 使用 fs.watch（）监听器的示例。
const fsWatcher = fs.watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    console.log(filename);
    // 打印: <Buffer ...>
  }
});
```
fsWatcher.close() // 停止对文件的监听