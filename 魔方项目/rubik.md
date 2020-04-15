###如何开启魔方项目之旅 ？

####启动项目预览
- 切到app目录下， 运行npm run build
- 还是在app目录下， 运行npm run dev
- 切到server目录下， 运行node app.js
- 通过0.0.0.0:4005/editor访问页面

####关于目录
- app目录是前端页面代码
- server是node服务端的代码

我们主要看app目录
- 首先，找到build文件夹下的webpack.base.conf.js, 我们可以看到entry选项，有三个入口：
![image.png](https://upload-images.jianshu.io/upload_images/3077057-301b6d034169f110.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

而我们启动项目后，看的是/editor路径，所以我们先看editor.js文件
![image.png](https://upload-images.jianshu.io/upload_images/3077057-532c6a4c7501223d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从上图可以看出，editor.js文件就是我们熟悉的实例化vue的代码， App参数就是对应layerout文件夹下的Editor.vue文件
![image.png](https://upload-images.jianshu.io/upload_images/3077057-1f0ff1be43b2663f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后就看到我们页面所对应的代码了。














###所发现的技术
- vue全家桶
- element-ui
- service worker， 用来做离线存储，提升性能
