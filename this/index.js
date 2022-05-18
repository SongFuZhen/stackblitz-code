// 'use strict';

// This
console.log('-------------- This --------------');

/**
 * 默认绑定
 * 需要使用无痕版的 Inspect 来运行, StackBlitz 会进行包装, 运行结果是错误的
 *
 * this 永远指向最后调用它的那个对象
 * 匿名函数的this永远指向window
 * 使用.call()或者.apply()的函数是会直接执行的
 * bind()是创建一个新的函数，需要手动调用才会执行
 * 如果call、apply、bind接收到的第一个参数是空或者null、undefined的话，则会忽略这个参数
 * forEach、map、filter函数的第二个参数也是能显式绑定this的
 */

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

// Case 1-4
(function () {
  var a = 1;
  function foo() {
    var a = 2;
    console.log(this);
    console.log(this.a);
  }

  foo();
});

// Case 1-5
(function () {
  var a = 1;
  function foo() {
    var a = 2;
    function inner() {
      console.log(this.a);
    }

    inner();
  }

  foo();
});

/**
 * 隐式绑定
 * this 永远指向最后调用它的那个对象
 * 不考虑箭头函数
 */

// Case 2-1
(function () {
  function foo() {
    console.log(this, this.a);
  }

  var obj = { a: 1, foo };

  var a = 2;

  obj.foo();
});

/**
 * 隐式绑定的隐式丢失问题
 * 隐式丢失其实就是被隐式绑定的函数在特定的情况下会丢失绑定对象。
 * Case 1: 使用另一个变量来给函数取别名
 * Case 2: 将函数作为参数传递时会被隐式赋值，回调函数丢失this绑定
 * 如果你把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题，且与包裹着它的函数的this指向无关。在非严格模式下，会把该函数的this绑定到window上，严格模式下绑定到undefined。
 */

// Case 3-1
(function () {
  function foo() {
    console.log(this, this.a);
  }

  var obj = { a: 1, foo };
  var a = 2;
  var foo2 = obj.foo;

  obj.foo(); // 1
  foo2(); // 2
});

// Case 3-2
(function () {
  function foo() {
    console.log(this, this.a);
  }

  var obj = { a: 1, foo };

  var a = 2;

  var foo2 = obj.foo;

  var obj2 = { a: 3, foo2: obj.foo };

  obj.foo(); // 1

  foo2(); // 2

  obj2.foo2(); // 3
});

// Case 3-3
(function () {
  function foo() {
    console.log(this.a);
  }

  function doFoo(fn) {
    console.log(this);
    fn();
  }

  var obj = { a: 1, foo };
  var a = 2;
  doFoo(obj.foo);
});

// Case 3-4

(function () {
  function foo() {
    console.log(this.a);
  }

  function doFoo(fn) {
    console.log(this);
    fn();
  }

  var obj = { a: 1, foo };
  var a = 2;
  var obj2 = { a: 3, doFoo };

  obj2.doFoo(obj.foo);
});

/**
 * 显示绑定
 * 使用.call()或者.apply()的函数是会直接执行的
 * bind()是创建一个新的函数，需要手动调用才会执行
 * .call()和.apply()用法基本类似，不过call接收若干个参数，而apply接收的是一个数组
 * 如果 call、apply、bind 接收到的第一个参数是空 / null / undefined 的话,则会忽略这个参数。
 */

// Case 4-1
(function () {
  function foo() {
    console.log(this.a);
  }

  var obj = { a: 1 };
  var a = 2;

  foo(); // 2
  foo.call(obj); // 1
  foo.apply(obj); // 1
  foo.bind(obj); // function
});

// Case 4-2
(function () {
  function foo() {
    console.log(this.a);
  }
  var a = 2;
  foo.call();
  foo.call(null);
  foo.call(undefined);
});

// Case 4-3
(function () {
  var obj1 = { a: 1 };

  var obj2 = {
    a: 2,

    foo1: function () {
      console.log(this.a);
    },

    foo2: function () {
      setTimeout(function () {
        console.log(this);
        console.log(this.a);
      }, 0);
    },
  };

  var a = 3;

  obj2.foo1(); // 2
  obj2.foo2(); // window, 3
});

// Case 4-4
(function () {
  var obj1 = {
    a: 1,
  };
  var obj2 = {
    a: 2,

    foo1: function () {
      console.log(this.a);
    },

    foo2: function () {
      setTimeout(
        function () {
          console.log(this);
          console.log(this.a);
          // }.bind(obj1),
        }.call(obj1),
        0
      );
    },
  };

  var a = 3;

  obj2.foo1(); // 2
  obj2.foo2(); // obj1, 1
});

// Case 4-5
(function () {
  var obj1 = {
    a: 1,
  };

  var obj2 = {
    a: 2,
    foo1: function () {
      console.log(this.a);
    },
    foo2: function () {
      function inner() {
        console.log(this);
        console.log(this.a);
      }

      inner();
      // inner.call(obj1);
    },
  };

  var a = 3;
  obj2.foo1();
  obj2.foo2();
});

// Case 4-6
(function () {
  function foo() {
    console.log(this.a);
  }

  var obj = { a: 1 };
  var a = 2;

  foo(); // 2
  foo.call(obj); // 1
  foo().call(obj); // Cannot read properties of undefined
});

// Case 4-7
(function () {
  function foo() {
    console.log(this.a);

    return function () {
      console.log(this.a);
    };
  }

  var obj = { a: 1 };
  var a = 2;

  foo(); // 2
  foo.call(obj); // 1
  foo().call(obj); // 2, 1
});

// Case 4-8
(function () {
  function foo() {
    console.log(this.a);
    return function () {
      console.log(this.a);
    };
  }
  var obj = { a: 1 };
  var a = 2;

  foo(); // 2
  foo.bind(obj); //
  foo().bind(obj); // 2
});

// Case 4-9
// foo()函数内的this虽然指定了是为obj，但是调用最后调用匿名函数的却是 window
(function () {
  function foo() {
    console.log(this.a);
    return function () {
      console.log(this.a);
    };
  }

  var obj = { a: 1 };
  var a = 2;

  foo.call(obj)(); // 1, 2
});

// Case 4-10
(function () {
  var obj = {
    a: 'obj',
    foo: function () {
      console.log('foo:', this.a);
      return function () {
        console.log('inner:', this.a);
      };
    },
  };

  var a = 'window';

  var obj2 = { a: 'obj2' };

  obj.foo()(); // foo: obj, inner: window
  obj.foo.call(obj2)(); // foo: obj2, inner: window
  obj.foo().call(obj2); // foo: obj, inner: obj2
});

// Case 4-11
(function () {
  var obj = {
    a: 1,
    foo: function (b) {
      b = b || this.a;
      return function (c) {
        console.log(this.a + b + c);
      };
    },
  };

  var a = 2;
  var obj2 = { a: 3 };

  obj.foo(a).call(obj2, 1); // 3 + 2 + 1
  obj.foo.call(obj2)(1); // 2 + 3 + 1
});

/**
 * 显式绑定的其它用法
 * 我们可以在一个函数内使用call来显式绑定某个对象，这样无论怎样调用它，其内部的this总是指向这个对象。
 */

// Case 5-1
(function () {
  function foo1() {
    console.log(this.a);
  }

  var a = 1;
  var obj = {
    a: 2,
  };

  var foo2 = function () {
    console.log(this);
    foo1.call(obj);
  };

  foo2(); // 2
  foo2.call(window); // 2
});

// Case 5-2
(function () {
  function foo1(b) {
    console.log(`${this.a} + ${b}`);

    return this.a + b;
  }

  var a = 1;
  var obj = {
    a: 2,
  };

  var foo2 = function () {
    return foo1.call(obj, ...arguments);
  };

  var num = foo2(3);
  console.log(num);
});

// Case 5-3
(function () {
  function foo(item) {
    console.log(item, this.a);
  }

  var obj = {
    a: 'obj',
  };

  var a = 'window';
  var arr = [1, 2, 3];

  // arr.forEach(foo, obj);
  // arr.map(foo, obj);

  arr.filter(function (i) {
    console.log(i, this.a);
    return i > 2;
  }, obj);
});

/**
 * new
 * 使用new来调用一个函数，会构造一个新对象并把这个新对象绑定到调用函数中的this
 */

// Case 6-1
(function () {
  function Person(name) {
    this.name = name;
  }

  var name = 'window';

  var person1 = new Person('Tom');
  console.log(person1.name);
});

// Case 6-2
(function () {
  function Person(name) {
    this.name = name;

    this.foo1 = function () {
      console.log(this.name);
    };

    this.foo2 = function () {
      return function () {
        console.log(this.name);
      };
    };
  }

  var person1 = new Person('person1');
  person1.foo1(); // person1
  person1.foo2()(); // ''
});

// Case 6-3
(function () {
  var name = 'window';

  function Person(name) {
    this.name = name;
    this.foo = function () {
      console.log(this.name);
      return function () {
        console.log(this.name);
      };
    };
  }

  var person2 = {
    name: 'person2',
    foo: function () {
      console.log(this.name);
      return function () {
        console.log(this.name);
      };
    },
  };

  var person1 = new Person('person1');
  person1.foo()(); // person1 \n window
  person2.foo()(); // person2 \n window
});

// Case 6-4
(function () {
  var name = 'window';
  function Person(name) {
    this.name = name;
    this.foo = function () {
      console.log(this.name);
      return function () {
        console.log(this.name);
      };
    };
  }
  var person1 = new Person('person1');
  var person2 = new Person('person2');

  person1.foo.call(person2)(); // person2 \n window
  person1.foo().call(person2); // person1 \n person2
});

/**
 * 箭头函数
 * 它里面的this是由外层作用域来决定的，且指向函数定义时的 this 而非执行时。
 * 字面量创建的对象，作用域是window，如果里面有箭头函数属性的话，this指向的是window
 * 构造函数创建的对象，作用域是可以理解为是这个构造函数，且这个构造函数的this是指向新建的对象的，因此this指向这个对象。
 * 箭头函数的this是无法通过bind、call、apply来直接修改，但是可以通过改变作用域中this的指向来间接修改。
 * 1. 字面量对象中普通函数与箭头函数的区别: 只有一层函数的题目
 * 2. 字面量对象中普通函数与箭头函数的区别：函数嵌套的题目
 * 3. 构造函数对象中普通函数和箭头函数的区别：只有一层函数的题目
 * 4. 构造函数对象中普通函数和箭头函数的区别：函数嵌套的题目
 * 5. 箭头函数结合.call的题目
 */

// Case 7-1
(function () {
  var obj = {
    name: 'obj',
    foo1: () => {
      console.log(this.name);
    },

    foo2: function () {
      console.log(this.name);
      return () => {
        console.log(this.name);
      };
    },
  };

  var name = 'window';
  obj.foo1(); // window
  obj.foo2()(); // obj \n obj
});

// Case 7-2
(function () {
  var name = 'window';
  var obj1 = {
    name: 'obj1',
    foo: function () {
      console.log(this.name);
    },
  };

  var obj2 = {
    name: 'obj2',
    foo: () => {
      console.log(this.name);
    },
  };

  obj1.foo(); // obj1
  obj2.foo(); // window
});

// Case 7-3
(function () {
  var name = 'window';
  var obj1 = {
    name: 'obj1',
    foo: function () {
      console.log(this.name);
      return function () {
        console.log(this.name);
      };
    },
  };

  var obj2 = {
    name: 'obj2',
    foo: function () {
      console.log(this.name);
      return () => {
        console.log(this.name);
      };
    },
  };

  var obj3 = {
    name: 'obj3',
    foo: () => {
      console.log(this.name);
      return function () {
        console.log(this.name);
      };
    },
  };

  var obj4 = {
    name: 'obj4',
    foo: () => {
      console.log(this.name);
      return () => {
        console.log(this.name);
      };
    },
  };

  obj1.foo()(); // obj1 \n window
  obj2.foo()(); // obj2 \n obj2
  obj3.foo()(); // window \n window
  obj4.foo()(); // window \n window
});

// Case 7-4
(function () {
  var name = 'window';

  function Person(name) {
    this.name = name;
    this.foo1 = function () {
      console.log(this.name);
    };

    this.foo2 = () => {
      console.log(this.name);
    };
  }

  var person2 = {
    name: 'person2',
    foo2: () => {
      console.log(this.name);
    },
  };

  var person1 = new Person('person1');
  person1.foo1(); // person1
  person1.foo2(); // person1
  person2.foo2(); // window
});

// Case 7-5
(function () {
  var name = 'window';
  function Person(name) {
    this.name = name;
    this.foo1 = function () {
      console.log(this.name);
      return function () {
        console.log(this.name);
      };
    };
    this.foo2 = function () {
      console.log(this.name);
      return () => {
        console.log(this.name);
      };
    };
    this.foo3 = () => {
      console.log(this.name);
      return function () {
        console.log(this.name);
      };
    };
    this.foo4 = () => {
      console.log(this.name);
      return () => {
        console.log(this.name);
      };
    };
  }
  var person1 = new Person('person1');
  person1.foo1()(); // person1 \n window
  person1.foo2()(); // person1 \n person1
  person1.foo3()(); // person1 \n window
  person1.foo4()(); // person1 \n person1
});

// Case 7-6
(function () {
  var name = 'window';

  var obj1 = {
    name: 'obj1',
    foo1: function () {
      console.log(this, this.name);
      return () => {
        console.log(this, this.name);
      };
    },
    foo2: () => {
      console.log(this, this.name);
      return function () {
        console.log(this, this.name);
      };
    },
  };

  var obj2 = {
    name: 'obj2',
  };

  obj1.foo1.call(obj2)(); // obj2 \n obj2
  obj1.foo1().call(obj2); // obj1 \n obj1
  obj1.foo2.call(obj2)(); // window \n window
  obj1.foo2().call(obj2); // window \n obj2
})();
