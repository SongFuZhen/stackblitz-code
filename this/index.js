// 'use strict';

// This
console.log('-------------- This --------------');

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
(function () {
  let a = 10;
  const b = 20;

  function foo() {
    console.log(this.a);
    console.log(this.b);
  }

  foo();

  console.log(window.a);
});
