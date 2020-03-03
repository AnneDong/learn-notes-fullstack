###组件库单元测试方案调研


[系列理论点](https://www.cnblogs.com/nianmumu/p/8417361.html)
[Karma实践](https://blog.csdn.net/z1324402468/article/details/94404220)
[浅谈单元测试](https://juejin.im/post/5b2da89cf265da597f1c7cab)
https://github.com/Jay-tian/js-unit-test
https://www.zhihu.com/question/292847438/answer/866194734
https://zhuanlan.zhihu.com/p/55960017
[Vue业务组件的单元测试](https://zhuanlan.zhihu.com/p/26752090)
https://www.cnblogs.com/nianmumu/p/8417472.html
[Vue官方文档-单元测试](https://cn.vuejs.org/v2/guide/unit-testing.html)
[Vue CookBook](https://cn.vuejs.org/v2/cookbook/unit-testing-vue-components.html)
[Vue Test Utils, Vue.js 官方的单元测试实用工具库](https://vue-test-utils.vuejs.org/zh/)
[前端自动化单元测试初探](https://www.jianshu.com/p/6726c0410650)
[实现一个Vue ui 库(单元测试，自动化测试，集成测试)](https://www.jianshu.com/p/20ab81dd51f8)
[前端单元测试实践（koa篇）](https://juejin.im/post/5d09935ce51d451063431816)

####单元测试
- View层测试
  - Jest框架(借助它的快照能力实现html结构级别的幂等验证、模块mock的能力、自动化单元测试解决方案)
  - gemini（离线截图能力实现像素级的幂等验证）
  - Test Utility
  - Enzyme（实现mock事件）
  - React Testing Library 
- Model层测试
- ViewModel层测试
[撰写测试的常用技巧](https://vue-test-utils.vuejs.org/zh/guides/common-tips.html)

####实用工具库Vue Test Utils

Vue Test Utils通过将组件隔离挂载，然后模拟：
- 必要的输入(prop, 注入和用户事件)
- 对输出的断言（输出包括渲染结果、触发的自定义事件）
来测试Vue组件
被挂载的组件会返回到一个包裹器(wrapper)内，而包裹器会暴露很多封装、遍历和查询其内部的 Vue 组件实例的便捷的方法。

####测试运行器
#####Jest
功能最全的测试运行器。它所需的配置是最少的，默认安装了 JSDOM，内置断言且命令行的用户体验非常好。不过你需要一个能够将单文件组件导入到测试中的预处理器。我们已经创建了 vue-jest 预处理器来处理最常见的单文件组件特性，但仍不是 vue-loader 100% 的功能。
[用 Jest 测试单文件组件](https://vue-test-utils.vuejs.org/zh/guides/testing-single-file-components-with-jest.html)
vue-jest 目前并不支持 vue-loader 所有的功能，比如自定义块和样式加载。额外的，诸如代码分隔等 webpack 特有的功能也是不支持的。如果要使用这些不支持的特性，你需要用 Mocha 取代 Jest 来运行你的测试，同时用 webpack 来编译你的组件。

#####mocha-webpack
一个 webpack + Mocha 的包裹器，同时包含了更顺畅的接口和侦听模式。这些设置的好处在于我们能够通过 webpack + vue-loader 得到完整的单文件组件支持，但这本身是需要很多配置的
[用 Mocha 和 webpack 测试单文件组件](https://vue-test-utils.vuejs.org/zh/guides/testing-single-file-components-with-mocha-webpack.html)

#####[Karma](http://karma-runner.github.io/3.0/index.html)
Karma 是一个启动浏览器运行测试并生成报告的测试运行器。我们会使用 Mocha 框架撰写测试，同时使用 chai 作为断言库。
- 一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。
- 该工具可用于测试所有主流Web浏览器，也可集成到CI（Continuous integration）工具，也可和其他代码编辑器一起使用。
- 这个测试工具的一个强大特性就是，它可以监控文件的变化，然后自行执行，通过console.log显示测试结果。Karma的一个强大特性就是，它可以监控一套文件的变换，并立即开始测试已保存的文件，用户无需离开文本编辑器。测试结果通常显示在命令行中，而非代码编辑器。这也就让 Karma 基本可以和任何 JS 编辑器一起使用。

#####[Mocha](https://mochajs.org/)
- mocha 是一个功能丰富的前端测试框架。
- 所谓"测试框架"，就是运行测试的工具。
- 通过它，可以为JavaScript应用添加测试，从而保证代码的质量。
- mocha 既可以基于 Node.js 环境运行 也可以在浏览器环境运行。
- 欲了解更多可去官方网站进行学习
[Mocha实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

#####[sinon](https://segmentfault.com/a/1190000010372634)
sinon是一个测试工具，可以使用sinon来进行模拟http等异步请求操作，作为间谍监听回调函数调用等功能来帮助我们更轻松实现测试。

#####[Travis.CI](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)
- 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。

- 持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。确保符合预期以后，再将新代码"集成"到主干。

- 持续集成的好处在于，每次代码的小幅变更，就能看到运行结果，从而不断累积小的变更，而不是在开发周期结束时，一下子合并一大块代码。

####断言库

`所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。`
`断言功能由断言库来实现，Mocha 本身不带断言库，所以必须先引入断言库。`
`Mocha 并不限制使用哪一种，它允许你使用你想要的任何断言库。`

常见的断言库
- [assert](http://nodejs.cn/api/assert.html)(Node.js中的断言模块)
- [should.js](https://github.com/shouldjs/should.js)
- [expect.js](https://github.com/Automattic/expect.js)
- [chai.js](https://www.chaijs.com/)（[chai.js中文翻译](https://www.jianshu.com/p/f200a75a15d2)）

####测试覆盖率
我们可以使用 karma-coverage 插件来设置 Karma 的代码覆盖率。

默认情况下，karma-coverage 不会使用 source map 来对照覆盖率报告。所以我们需要使用 babel-plugin-istanbul 来确认正确匹配的覆盖率。

####流行组件库的单元测试方案
- [iView](https://github.com/view-design/ViewUI/blob/master/package.json)
  - Vue
  - 使用karma做单元测试
- [VUX](https://vux.li/)
  - Vue
  - 使用karma做单元测试
- [Element](https://element.eleme.cn/#/zh-CN)
  - Vue
  - 使用karma做单元测试
- [cube-ui](https://github.com/didi/cube-ui)
  - Vue
  - 使用karma做单元测试
- [Vant](https://youzan.github.io/vant/#/zh-CN/)
  - Vue
  - 使用Jest做单元测试
- [Muse-UI](https://github.com/museui/muse-ui)
  - Vue
  - 使用Jest做单元测试
- [Ant Design](https://github.com/ant-design/ant-design/blob/master/package.json)
  - React
  - 使用Jest做单元测试

###[使用karma+mocha+chai+sinon+@vue/test-utils为你的组件库增加单元测试案例](https://www.javascriptcn.com/read-51682.html#sinon)

####针对wand-ui中button组件需要进行测试的方面进行说明
1、测试button是否存在
2、button属性相关的测试，比如类型、大小、颜色等，具体看button组件有哪些功能
3、button事件测试，可使用sinon进行测试
其实可根据组件的API和Event说明来进行已有功能是否正常进行测试，这就要求开发组件的开发人员必须完善组件的文档。

###总结
根据上述调研的资料，以及主流组件库使用单元测试方案来看，目前主要是两种方式的单元测试比较流行：
- Jest
- Karma

而Karma是Vue框架使用的潮流， Jest是React框架使用的潮流

所以根据项目框架来选择对应的单元测试的方案

`针对公司的Vue项目，建议选择Karma + Mocha + Chai这一套进行测试`, 上手比较快，容易理解。