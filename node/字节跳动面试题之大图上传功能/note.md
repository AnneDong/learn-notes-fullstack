
###字节跳动面试题之大图上传功能(没有服务器代码)

![image.png](https://upload-images.jianshu.io/upload_images/3077057-34e7df904e9e9471.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

####实现方式两种
+ `通过formData(new formData())将file文件传给服务器，服务器接收到客户端传递的file等信息，然后在服务器端创建file文件, 把服务器存储的文件地址返回给客户端`

  - 关于formData， 参见博客 https://blog.csdn.net/candy_27/article/details/83961635

  - 核心代码
  ```javascript
    function $formatFileName(filename) {
      let dotIndex = filename.lastIndexOf('.')
      let name = filename.substring(0, dotIndex)
      let suffix = filename.substring(dotIndex + 1)
      name = md5(name) + new Date().getTime() // 保证文件名不重名
      return {
        hash: name,
        suffix,
        filename: `${name}.${suffix}`
      }
    }

    fileInp.onchange = async function () {

      let file = fileInp.files[0]
      let formData = new FormData()
      // Content-Type: mutilpart/form-data
      formData.append('chunk', file) // 添加数据
      formData.append('filename', $formatFileName(file.name).filename) // 添加数据
      let result = await $ajax({
        url: 'http://127.0.0.1:5678/single',
        // 传到服务器端以后，服务器通过fs.createReadStream()和fs.crateWriteStream()来进行读和写
        data: formData
      })
      if (result.code === 0) {
        serverImg.src = result.path
      }

    }
  ```
+ `客户端传递给服务器当前文件的base64编码（通过fileReader()可转为流信息），服务器接收到base64信息后,把base64转换为具体的图片存储，返回图片存储的地址给客户端`

  - 关于FileReader类参见：
    - https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader

    - https://www.jianshu.com/p/42fd93f08554
    - https://blog.csdn.net/weixin_44116302/article/details/91554835
  - 核心代码
  ```javascript
  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      // base64
      let fileRead = new FileReader()
      fileRead.readAsDataURL(file)
      fileRead.onload = ev => {
      resolve(ev.target.result)
      }
    })
  }

  fileInp.onchange = async function () {

    let file = fileInp.files[0]
    let base64 = await convertBase64(file)
    console.log('base64 = ', base64)

    let result = await $ajax({
      url: 'http://127.0.0.1:5678/single2',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // // 传到服务器端以后，服务器通过Buffer.from(chunk, 'base64')和fs.writeFileSync(chunk_dir, chunk)来进行读和写
      data: `chunk=${encodeURIComponent(base64)}&filename=${$formatFileName(file.name).filename}`
    })
    if (result.code === 0) {
      serverImg.src = result.path
    }

  }
  ```

####大文件上传

  ![image.png](https://upload-images.jianshu.io/upload_images/3077057-e9ded987619a9454.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 将文件进行切片
  - 并发切片请求
  - 合并切片

```javascript
function $formatFileName(filename) {
  let dotIndex = filename.lastIndexOf('.')
  let name = filename.substring(0, dotIndex)
  let suffix = filename.substring(dotIndex + 1)
  name = md5(name) + new Date().getTime() // 保证文件名不重名
  return {
    hash: name,
    suffix,
    filename: `${name}.${suffix}`
  }
}

fileInp.onchange = async function () {
      let file = fileInp.files[0]
      console.log(file)
      if (!file) return

      // file切片化, 通过
      // 把一个文件切成五个切片（固定切片数量 也可以固定切片大小）
      let partSize = file.size / 5 // 每个切片的大小
      let cur = 0
      let i = 0
      let partList = [] // 切片存储
      let {
        hash,
        suffix,
        filename
      } = $formatFileName(file.name)
      while (i < 5) {
        partList.push({
          chunk: file.slice(cur, cur + partSize), // 切片信息
          filename: `${hash}-${i}.${suffix}`
        })
        i++
      }

      // 并发parList中的切片
      partList = partList.map(item => {
        let formData = new FormData()
        // Content-Type: mutilpart/form-data
        formData.append('chunk', item.chunk)
        formData.append('filename', item.filename)
        return $ajax({
          url: 'http://127.0.0.1:5678/chunk',
          data: formData
        }).then(result => {
          if (result.code === 0) {
            return Promise.resolve(result)
          }
          return Promise.reject(result)
        })
      })
      console.log(partList)

      // 并发请求
      await Promise.all(partList)

      // 合并切片
      let result = await $ajax({
        url: 'http://127.0.0.1:5678/chunk',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // // 传到服务器端以后，服务器通过Buffer.from(chunk, 'base64')和fs.writeFileSync(chunk_dir, chunk)来进行读和写
        data: `filename=${filename}`
      })
      if (result.code === 0) {
        serverImg.src = result.path
      }
    }
```

####上传进度
#####方法一 监听切片上传完成的数量
手动对文件进行切片，然后用100 / 切片的数量 即为每个切片完成时所占的百分比（3.html）
```javascript
// ajax 
// 简单的ajax请求
function $ajax(options) {
  options = Object.assign({
    url: '',
    method: 'post',
    data: null,
    headers: {}
  }, options)
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest

    xhr.open(options.method, options.url)
    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key])
    })
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {
          resolve(JSON.parse(xhr.responseText))
          return
        }
        reject(xhr)
      }
    }
    xhr.send(options.data)
  })
}

function $formatFileName(filename) {
  let dotIndex = filename.lastIndexOf('.')
  let name = filename.substring(0, dotIndex)
  let suffix = filename.substring(dotIndex + 1)
  name = md5(name) + new Date().getTime() // 保证文件名不重名
  return {
    hash: name,
    suffix,
    filename: `${name}.${suffix}`
  }
}

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    // base64
    let fileRead = new FileReader()
    fileRead.readAsDataURL(file)
    fileRead.onload = ev => {
     resolve(ev.target.result)
    }
  })
}

// html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <!-- accept表示只支持上传的文件类型 -->
  <input type="file" id="fileInp" accept="image/*">
  <span id="progress">0%</span>
  <br>
  <img src="" alt="" id="serverImg">

  <script src="http://cdn.bootcss.com/blueimp-md5/1.1.0/js/md5.min.js"></script>
  <script src="./js/ajax.js"></script>
  <script>
    // js中可直接通过id访问元素
    // 数据劫持
    let _data = new Proxy({total: 0}, {
      set(target, key, value) {
        target[key] = value
        if (_data.total >= 100) {
          progress.innerHTML = '上传完成'
        }
        progress.innerHTML = `${_data.total}%`
      }
    })
    fileInp.onchange = async function () {
      let file = fileInp.files[0]
      console.log(file)
      if (!file) return
      progress.innerHTML = '0%' // 重新上传归零

      // file切片化, 通过
      // 把一个文件切成五个切片（固定切片数量 也可以固定切片大小）
      let partSize = file.size / 5 // 每个切片的大小
      let cur = 0
      let i = 0
      let partList = [] // 切片存储
      let {
        hash,
        suffix,
        filename
      } = $formatFileName(file.name)
      while (i < 5) {
        partList.push({
          chunk: file.slice(cur, cur + partSize), // 切片信息
          filename: `${hash}-${i}.${suffix}`
        })
        i++
      }

      // 并发parList中的切片
      partList = partList.map(item => {
        let formData = new FormData()
        // Content-Type: mutilpart/form-data
        formData.append('chunk', item.chunk)
        formData.append('filename', item.filename)
        return $ajax({
          url: 'http://127.0.0.1:5678/chunk',
          data: formData
        }).then(result => {
          if (result.code === 0) {
            _data.total += 20 // 我们手动计算的金进度加和 每上传一个切片， 进度加20 （100 / 5）
            return Promise.resolve(result)
          }
          return Promise.reject(result)
        })
      })
      console.log(partList)

      // 并发请求
      await Promise.all(partList)

      // 合并切片
      let result = await $ajax({
        url: 'http://127.0.0.1:5678/chunk',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // // 传到服务器端以后，服务器通过Buffer.from(chunk, 'base64')和fs.writeFileSync(chunk_dir, chunk)来进行读和写
        data: `filename=${filename}`
      })
      if (result.code === 0) {
        serverImg.src = result.path
      }
    }
  
  </script>
</body>
</html>
```

#####方法二 利用ajax中的upload的onprogress事件，监听progress选项，获取进度
```javascript
// ajax
// 简单的ajax请求
function $ajax(options) {
  options = Object.assign({
    url: '',
    method: 'post',
    data: null,
    headers: {},
    progress: Function.prototype // progress默认是空函数
  }, options)
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest

    // xhr对象中自带upload，上传时触发progress函数， 对应4.html
    xhr.upload.onprogress = options.progress

    xhr.open(options.method, options.url)
    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key])
    })
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {
          resolve(JSON.parse(xhr.responseText))
          return
        }
        reject(xhr)
      }
    }
    xhr.send(options.data)
  })
}

function $formatFileName(filename) {
  let dotIndex = filename.lastIndexOf('.')
  let name = filename.substring(0, dotIndex)
  let suffix = filename.substring(dotIndex + 1)
  name = md5(name) + new Date().getTime() // 保证文件名不重名
  return {
    hash: name,
    suffix,
    filename: `${name}.${suffix}`
  }
}

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    // base64
    let fileRead = new FileReader()
    fileRead.readAsDataURL(file)
    fileRead.onload = ev => {
     resolve(ev.target.result)
    }
  })
}

// html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <!-- 不限文件类型， 使用ajax中progress选项进行监听上传速度 -->
  <input type="file" id="fileInp">
  <span id="progress">0%</span>
  <br>
  <img src="" alt="" id="serverImg">

  <script src="http://cdn.bootcss.com/blueimp-md5/1.1.0/js/md5.min.js"></script>
  <script src="./js/ajax.js"></script>
  <script>
    // js中可直接通过id访问元素
    // 数据劫持
    let _data = new Proxy({total: 0}, {
      set(target, key, value) {
        target[key] = value
        if (_data.total >= 100) {
          progress.innerHTML = '上传完成'
        }
        progress.innerHTML = `${_data.total}%`
      }
    })
    fileInp.onchange = async function () {
      let file = fileInp.files[0]
      console.log(file)
      if (!file) return
      progress.innerHTML = '0%' // 重新上传归零

      let formData = new FormData()
      // Content-Type: mutilpart/form-data
      formData.append('chunk', file)
      formData.append('filename', $formatFileName(file.name).filename)
      
      let result = await $ajax({
        url: 'http://127.0.0.1:5678/single',
        data: formData,
        // 新增progress选项
        progress: (ev) => {
          // ev.loaded 已经上传的大小
          // ev.total 总大小
          _data.total = Math.ceil(ev.loaded / ev.total * 100)
        }
      })
      if (result.code === 0) {
        serverImg.src = result.path
      }
    }
  
  </script>
</body>
</html>
```

####参考资料
- input(type=file)：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file
- formData: https://blog.csdn.net/candy_27/article/details/83961635
- 关于FileReader类参见：
    - https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader

    - https://www.jianshu.com/p/42fd93f08554
    - https://blog.csdn.net/weixin_44116302/article/details/91554835