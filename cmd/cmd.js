// CMD规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD规范整合了CommonJS和AMD规范的特点。

// 在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。

define(function (require) {
  var demo = require('./demo');

  demo.show();
});
