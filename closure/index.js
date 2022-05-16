// 'use strict';

// Case 1 :: 可以拆分多个参数 Math.pow(x, n) 的函数为单个参数
function make_pow(n) {
  return function (x) {
    return Math.pow(x, n);
  };
}

const pow_2 = make_pow(2);
const pow_3 = make_pow(3);

console.log('pow 2 :: ', pow_2(3)); // 9
console.log('pow 3  ', pow_3(3)); // 27

// Case 1-1 :: 两个参数拆分成单个参数

// 工厂函数，接收一个参数，返回一个函数。返回的函数接收一个新的参数，返回x+y值
function make_adder(x) {
  return function (y) {
    return x + y;
  };
}

var add_5 = make_adder(5); // 闭包
var add_10 = make_adder(10);

console.log('add_5', add_5(5)); // 10
console.log('add_10', add_10(10)); // 20

// Case2 :: 定义类似 private 的私有变量，不可以直接改变 x 的值，但是可以通过 inc 函数改变

// 闭包就是携带状态的函数，并且他的状态可以完全对外隐藏起来

function counter(initial) {
  let x = initial || 0;

  return {
    inc: function () {
      x += 1;
      return x;
    },
  };
}

// 定义函数
const counter_func = counter();

console.log('counter 1 ::', counter_func.inc());
console.log('counter 2 ::', counter_func.inc());
console.log('counter 3 ::', counter_func.inc());

const counter_func_2 = counter(100);
console.log('counter 101 ::', counter_func_2.inc());
console.log('counter 102 ::', counter_func_2.inc());
console.log('counter 103 ::', counter_func_2.inc());

// Case3 :: 函数作为返回值

// 在函数 lazy_sum 内部定义了一个新的函数 sum，sum 能够访问 lazy_sum 函数的参数和局部变量。当 lazy_sum 返回 sum 的时候，相关的参数和变量都保存在返回的函数 sum 中。

function lazy_sum(arr) {
  var sum = function () {
    return arr.reduce(function (x, y) {
      return x + y;
    });
  };

  return sum;
}

const lazy_sum_func = lazy_sum([1, 2, 3, 4, 5]);
console.log('lazy_sum :: ', lazy_sum_func());

// Case4 :: 返回的函数不能引用任何循环变量，或者在后续会发生变化的变量

function count_func() {
  var arr = [];
  for (var i = 1; i <= 3; i++) {
    arr.push(function () {
      return i * i;
    });
  }

  return arr;
}

const results = count_func();
const f1 = results[0];
const f2 = results[1];
const f3 = results[2];

console.log('f1 = ', f1(), ', f2 =', f2(), ', f3 = ', f3());

// Case4-1 :: 扩展，要保证正确的话，需要传入 i。创建一个匿名函数并立即执行

function count_func_2() {
  var arr = [];
  for (var i = 1; i <= 3; i++) {
    arr.push(
      (function (n) {
        return function () {
          return n * n;
        };
      })(i)
    );
  }

  return arr;
}

const results_2 = count_func_2();
const f1_2 = results_2[0];
const f2_2 = results_2[1];
const f3_2 = results_2[2];

console.log('f1_2 = ', f1_2(), ', f2_2 =', f2_2(), ', f3_2 = ', f3_2());

// Case5 :: 能不用闭包就不用

function name_message_func(name, message) {
  this.name = name;
  this.message = message;

  // 闭包
  this.getName = function () {
    return this.name;
  };

  // 闭包
  this.getMessage = function () {
    return this.message;
  };
}

// Case5-1 :: 修改，使用 Class 代替

class name_message_func_2 {
  constructor(name, message) {
    this.name = name.toString();
    this.message = message.toString();
  }

  getName() {
    return this.name;
  }

  getMessage() {
    return this.message;
  }
}

var tom = new name_message_func_2('tom', 'hi');

console.log('name = ', tom.getName(), ', message = ', tom.getMessage());

// Case5-2 :: 修改，使用 prototype 代替

function name_message_func_3(name, message) {
  this.name = name;
  this.message = message;
}

name_message_func_3.prototype.getName = function () {
  return this.name;
};

name_message_func_3.prototype.getMessage = function () {
  return this.message;
};

var jerry = new name_message_func_3('jerry', 'hello');

console.log('name = ', jerry.getName(), ', message = ', jerry.getMessage());
