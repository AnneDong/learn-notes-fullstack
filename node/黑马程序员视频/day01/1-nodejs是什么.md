###Node.js是什么？
- **1、Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.**
  - `不是一门语言`
  - `不是库、不是框架`
  - `Node.js是一个JavaScript运行时环境`
  - `简单来说，就是Node.js可以解析和执行JavaScript代码`
  - `以前只有浏览器可以解析和执行JavaScript代码`
  - `也就是说现在的JavaScript可以完全脱离浏览器来运行，一切都因为Node.js的出现`

- *浏览器中的JavaScript组成*

  - EcmaScript

    - 基本的语法
    - if
    - var
    - function
    - Object
    - Array
  - BOM
  - DOM

- *Node.js中的JavaScript组成*

  - **没有DOM、BOM**
  - EcmaScript
  - 在Node.js这个Javascript执行环境中为JavaScript提供了一些服务器级别的操作API

    - 例如文件读写
    - 网络服务的构建
    - 网络通信
    - http服务器
    - 。。。
- **2、构建于chrome的V8引擎之上**

  - 代码是具有特定格式的字符串而已
  - 但是引擎可以认识它，可以帮你解析和执行
  - V8引擎是目前公认的解析js代码最快的
  - Node.js作者把V8引擎移植了出来，开发了一个独立的JavaScript运行时环境
- **3、Node.js uses an event-driven,non-blocking I/O model that makes it lightweight and efficient.**

  - 事件驱动
  - 非阻塞I/O模型
  - 轻量和高效

- **4、npm: 世界上最大的开源库生态系统**