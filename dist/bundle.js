(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// run `node index.js` in the terminal

// 使用 require 引入
// CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
const modules_demo = require('./modules/demo');

console.log('初始化 Number', modules_demo.number);
console.log('初始化 Arr', modules_demo.arr);
console.log('-------------------------------');
console.log('函数操作', modules_demo.foo());
console.log('-------------------------------');
console.log('转化后 Number', modules_demo.number);
console.log('转化后 Arr', modules_demo.arr);

},{"./modules/demo":2}],2:[function(require,module,exports){
// CommonJS 的写法
// 使用 Module.exports 可以导出任何时值
// number 是原始类型， number 值在经过 Foo 调用之后，内部会改变，但是再外部调用是不会改变的
// arr 是对象， arr 值会改变
var number = 5;

var arr = [1, 2, 3, 4, 5];

var foo = function () {
  console.log('--- demo.js foo() --- ');
  // 操作 number
  number = number + 1;
  console.log('new Number :: ', number);

  // 操作 arr
  arr.push(6);
  console.log('new Arr :: ', arr);

  return false;
};

module.exports.number = number;
module.exports.arr = arr;
module.exports.foo = foo;

},{}]},{},[1]);
