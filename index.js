// run `node index.js` in the terminal

// 使用 require 引入
// CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

// CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
// CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

// ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

const modules_demo = require('./modules/demo');

console.log('初始化 Number', modules_demo.number);
console.log('初始化 Arr', modules_demo.arr);
console.log('-------------------------------');
console.log('函数操作', modules_demo.foo());
console.log('-------------------------------');
console.log('转化后 Number', modules_demo.number);
console.log('转化后 Arr', modules_demo.arr);

