// 'use strict';

// This
console.log('-------------- This --------------');

(function () {
  var a = 10;
  function foo() {
    console.log(this.a);
  }

  foo();
})();
