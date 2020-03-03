###wand-ui组件库中集成单元测试

方案： 采用Karma + mocha + chai
dev_unitTest2_yandong_20200302 wand-ui1.0集成
dev_unitTest_yandong_20200303 wand-ui2.0集成

####环境安装
- 在开发环境中安装以下依赖：
```js
"@vue/test-utils": "^1.0.0-beta.31",
"babel-preset-env": "^1.3.2",
"karma": "^1.4.1",
"chai": "^4.2.0",
"mocha": "^3.2.0",
"karma-chrome-launcher": "^3.1.0",
"karma-coverage": "^1.1.1",
"karma-mocha": "^1.3.0",
"karma-mocha-reporter": "^2.2.5",
"karma-phantomjs-launcher": "^1.0.2",
"karma-phantomjs-shim": "^1.4.0",
"karma-sourcemap-loader": "^0.3.7",
"karma-spec-reporter": "0.0.31",
"karma-webpack": "^2.0.2",
"sinon-chai": "^3.5.0",
"karma-coverage-istanbul-reporter": "^2.1.1",
"babel-plugin-istanbul": "^6.0.0",
```
全局安装karma、karma-cli
- 在.babelrc文件中加入覆盖率报告的配置
```js
{
  "presets": [["env", { "modules": false, "loose": true }]],
  "plugins": ["transform-runtime", "transform-object-rest-spread"],
  "env": {
    "commonjs": {
      "presets": [["env", { "modules": "commonjs", "loose": true }]]
    },
    // 这里是新增的
    "test": {
      "plugins": ["istanbul"]
    }
  }
}
```
- 在package.json中添加运行Karma的命令
```js
"test2": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
```
- 在test/unit文件夹中创建Karma.conf.js文件， 内容如下：
```js
// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

// 需要再build文件夹下加入webpack.test.conf.js
// 需要在config文件夹下加上
var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    // 自带的phantomJs浏览器的时候会报错,所以需要安装karma-chrome-launcher npm i -D karma-chrome-launcher 然后在karma.conf.js中将 browsers: ['PhantomJS']改成browsers: ['Chrome']
    browsers: ['Chrome'],
    frameworks: ['mocha', 'phantomjs-shim'],
    // reporters: ['spec', 'coverage'],
    reporters: ['mocha', 'coverage'],
    files: ['./index.js'],

    // 需要被测试的文件路径
    preprocessors: {
      // './index.js': ['webpack', 'sourcemap'],
      './index.js': ['webpack', 'sourcemap', 'coverage'],
      '../../src': ['webpack', 'sourcemap', 'coverage']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

```
- 在test/unit文件夹下再创建一个index.js文件， 内容如下：
```js
import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
// const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
const srcContext = require.context('../../src', true, /\.vue$/)
// const srcContext = require.context('../../src/components/**/index.vue', true, '')
srcContext.keys().forEach(srcContext)

```
- 在test/unit下创建specs文件夹，在specs文件夹下创建所要进行单元测试组件的js文件， 命名格式`**.spec.js(如Button.spec.js)`
```js
/** Button.spec.js */

// import Vue from 'vue'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Button from '../../../src/components/button/index.vue'

const wrapper = mount(Button, {
  propsData: {
    type: 'primary',
    size: 'normal',
    text: '按钮文字'
  }
})

describe('Button.vue', () => {
  // 检查是否存在button元素
  it('has a button', () => {
    console.log('wrapper html = ', wrapper.html())
    expect(wrapper.contains('button')).equal(true)
  })

  // 检查是否存在某些样式类名
  it('has we-button class', () => {
    expect(wrapper.classes()).contain('we-button')
  })

  // 检查是否存在某些属性
  it('has class attribute', () => {
    expect(wrapper.attributes().class).eql('we-button we-button-type-primary we-button-size-normal')
  })

  // 检查props
  it('has props', () => {
    expect(wrapper.props().type).eql('primary')
    expect(wrapper.props().size).eql('normal')
    expect(wrapper.props().text).eql('按钮文字')
  })

  // 模拟用户交互
  it('click', () => {
    console.log('is Disabled', wrapper.props().disabled)
    if (wrapper.props().disabled) {
      console.log('按钮被禁止点击')
    } else {
      const button = wrapper.find('button')
      button.trigger('click') // trigger一次， JSON.stringify(wrapper.emitted()) 会返回 'emit', '{"on-click":[[{"isTrusted":false}]]}'
      button.trigger('click') // 第二次trigger JSON.stringify(wrapper.emitted())返回 'emit', '{"on-click":[[{"isTrusted":false}],[{"isTrusted":false}]]}'

      // 触发自定义的事件之前, 要触发click事件
      wrapper.vm.$emit('on-click', '我设置的点击事件') // 再emit一次 JSON.stringify(wrapper.emitted()) 会返回'emit', '{"on-click":[[{"isTrusted":false}],[{"isTrusted":false}],["我设置的点击事件"]]}'
      console.log('emit', JSON.stringify(wrapper.emitted()))
      console.log('length = ', wrapper.emitted()['on-click'].length) // 返回click事件的次数
      expect(wrapper.emitted()['on-click'][2][0]).to.equal('我设置的点击事件')
    }
    console.log('after emit wrapper html = ', wrapper.html())
  })

  // 抛出自定义事件
  // it('自定义事件', () => {
  //   wrapper.vm.$emit('on-click', '我设置的点击事件')
  //   console.log('emit', JSON.stringify(wrapper.emitted()))
  //   console.log('length = ', wrapper.emitted()['on-click'].length)
  //   expect(wrapper.emitted()['on-click'].length).to.equal(2)
  // })
  // 检查原始组件选项
  // it('has a created hook', () => {
  //   expect(typeof Button.created).to.equal('function')
  // })
})

```
- 运行npm run test2, 结果如下：

截图是wand-ui1.0的
![image.png](https://upload-images.jianshu.io/upload_images/3077057-d174336996cbecfa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

覆盖率的可视化
![image.png](https://upload-images.jianshu.io/upload_images/3077057-a7b6e24230e81eb2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###总结
在集成单元测试到项目中，遇到了很多问题：
- 安装环境以后，运行命令爆出很多错误提示，一一解决
- index.js中的测试文件的覆盖，一开始包含了src下的md文件，导致一直运行报错，后边处理检测路径就好了
  `const srcContext = require.context('../../src', true, /\.vue$/)`
- 覆盖率一直为0， 在.babelrc文件中加上test配置就好了
- 测试用例编写，语法不熟悉，设计费时间。