// 'use strict';

// This
console.log(
  '-------------- This, 最好使用 VSCode 进行运行，StackBlitz 会自动包裹一个 function, 导致 this 指向不准确 --------------'
);

// Case 1-1
(function () {
  var a = 10;
  function foo() {
    console.log(this.a);
  }

  foo();
});

// Case 1-2
// 'use strict';
(function () {
  var a = 10;
  function foo() {
    console.log('this1', this);
    console.log(window.a);
    console.log(this.a);
  }

  console.log(window.foo);
  console.log('this2', this);

  foo();
});

// Case 1-3
let a = 10;
const b = 20;

// function foo() {
//   console.log(this.a);
//   console.log(this.b);
// }

// foo();

console.log(window.a);
