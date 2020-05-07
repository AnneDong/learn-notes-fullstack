###[字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.im/post/5dff8a26e51d4558105420ed?utm_source=gold_browser_extension#heading-24)

####分析下作者为什么要出这个题？
面试官在考察es6文件对象、ajax上传，async await promise、后台文件存储、流操作等全面的全栈技能的同时，提升难度到大文件和断点续传，通过这个主题，可以较好的考察面试者 全面解决问题的能力和技术细节。

####实现思路
- 切片
  - 利用file.slice()方法进行切片, 返回Blob对象 {size: '', type: ''}, 也就是每个切片的类型
  ![image.png](https://upload-images.jianshu.io/upload_images/3077057-d6a235e22f39ed82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  ```javascript
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <input type="file" id="fileInput" />
    <script>
      fileInput.addEventListener('change', (e) => {
        // console.log(file)
        let file = e.target.files[0] // 获取所选文件信息
        // console.log(Object.prototype.toString.call(file)) // [object File]
        // console.log(Object.prototype.toString.call(file.slice(0, 102400))) // [object Blob]
        let cur = 0,
            size = 1024 * 1024 // 1M一个切片
        let fileChunkList = []
        while (cur < file.size) {
          fileChunkList.push({
            file: file.slice(cur, cur + size)
          })
          cur += size
        }
        console.log(fileChunkList)
      })
    </script>
  </body>
  </html>
  ```

  - js二进制文件类型的blob协议，在文件上传到服务器之前可以预览

    - es6 [blob对象](https://www.cnblogs.com/cheng825/p/11694348.html)在上传文件上解决什么问题？
    - 传统es5文件只有上传到服务器以后，静态服务器返回一个远程地址给我们，我们才能看到图片
    - es6提供本地客户端操作文件的能力（file对象），然后通过blob协议让图片立马显示出来，再配上上传进度，达到更好的用户体验
    ![image.png](https://upload-images.jianshu.io/upload_images/3077057-ff6c341b8b69fd09.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    ```javascript
    
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
        <input type="file" id="fileInput">
        <img src="" id="pic" alt="">
        <script>
          // es6 blob对象在上传文件上解决什么问题？
          // 传统es5文件只有上传到服务器以后，静态服务器返回一个远程地址给我们，我们才能看到图片
          // es6提供本地客户端操作文件的能力（file对象），然后通过blob协议让图片立马显示出来，再配上上传进度，达到更好的用户体验
          fileInput.addEventListener('change', (e) => {
            // console.log(file)
            let file = e.target.files[0] // 获取所选文件信息
            // 图片预览
            // 通过window.URL.createObjectURL(blob对象)创建一个Blob协议的地址
            //为了获得最佳性能，最后完成图片预览后，使用window.URL.revokeObjectURL(blob协议地址)释放内存
            let blobUrl = window.URL.createObjectURL(file)
            pic.src = blobUrl
            pic.onload = function() {
              window.URL.revokeObjectURL(blobUrl)
            }
          })
        </script>
      </body>
      </html>

    ```

- http切片并发请求上传
  - promise.all()
- 切片合并请求














###参考资料
- https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob
- https://www.cnblogs.com/cheng825/p/11694348.html
- [blob应用](https://www.cnblogs.com/hfultrastrong/p/10028145.html)
- [蚂蚁部落文章](https://www.softwhy.com/article-9802-1.html)