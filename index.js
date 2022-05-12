// run `node index.js` in the terminal

// 使用 require 引入
const modules_demo = require('./modules/demo');

console.log('初始化 Number', modules_demo.number);
console.log('初始化 Arr', modules_demo.arr);
console.log('-------------------------------');
console.log('函数操作', modules_demo.foo());
console.log('-------------------------------');
console.log('转化后 Number', modules_demo.number);
console.log('转化后 Arr', modules_demo.arr);
