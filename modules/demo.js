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
