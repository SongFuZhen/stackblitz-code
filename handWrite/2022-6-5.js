console.log('2022-6-5');

// #region 手写 instanceof

function my_instanceof(target, origin) {
  if (typeof target !== 'object' || target === null) {
    return false;
  }

  if (typeof origin !== 'function') {
    throw new Error('origin must be function');
  }

  let proto = Object.getPrototypeOf(target);

  while (proto) {
    if (proto === origin.prototype) {
      return true;
    }

    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

(function () {
  function Person(name, sex) {
    const result = {
      name,
      sex,
    };

    console.log(result);
    // return result;
  }

  const p = new Person('tom', '男');

  console.log(
    p instanceof Person,
    Person instanceof Object,
    my_instanceof(p, Person),
    my_instanceof(p, Object)
  );
})();

// #endregion

// #region 手写 new

function my_new() {
  // 获取构造函数，并取出第一项
  const Con = Array.prototype.shift.call(arguments);

  const obj = Object.create(Con.prototype);

  const ret = Con.apply(obj, arguments);

  return ret instanceof Object ? ret : obj;
}

(function () {
  const value = 1;
  function Person(name) {
    const result = {
      value: this.value,
      name,
    };

    // console.log(result);
    return result;
  }

  Person.prototype.eat = 'Eatting';

  const p = new Person('tom');
  console.log('new', p, p.name, p.eat);

  const p1 = my_new(Person, 'tom');
  console.log('my_new', p1, p1.name, p1.eat);
});

// #endregion

// #region 手写 call
Function.prototype.my_call = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  context = context || window;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  const args = [...arguments].slice(1);

  const result = context[fnSymbol](...args);

  delete context[fnSymbol];

  return result;
};

(function () {
  const obj = {
    value: 1,
  };

  function func(name) {
    const result = {
      value: this.value,
      name,
    };

    return result;
  }

  console.log('--', func('tom'));
  console.log('--', func.call(obj, 'tom'));
  console.log('--', func.my_call(obj, 'tom'));
});
// #endregion

// #region 手写 apply

Function.prototype.my_apply = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  context = context || window;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  let result = undefined;

  if (arguments[1]) {
    result = context[fnSymbol](...arguments[1]);
  } else {
    result = context[fnSymbol]();
  }

  delete context[fnSymbol];

  return result;
};

(function () {
  var obj = { value: 1 };
  function func(name) {
    const result = {
      value: this.value,
      name,
    };

    return result;
  }

  console.log('--', func.apply(obj, ['tom']));
  console.log('--', func.my_apply(obj, ['tom']));
});

// #endregion

// #region 手写 bind

Function.prototype.my_bind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type error');
  }

  // context = context || window;

  const args = [...arguments].slice(1);
  const fn = this;

  return function newFn() {
    // const a = Array.prototype.slice.call(arguments);

    // const b = [...arguments];

    // console.log(a, b, JSON.stringify(a) === JSON.stringify(b));

    // 判断是否是空的
    return fn.apply(
      this instanceof newFn ? this : context,
      args.concat([...arguments])
      // args.concat(Array.prototype.slice.call(arguments))
    );
  };
};

(function () {
  const obj = {
    value: 1,
  };

  function func(name, sex) {
    const result = {
      value: this.value,
      name,
      sex,
    };

    return result;
  }

  const tom_bind = func.bind(obj)('tom', '男');
  console.log('---', tom_bind);

  const tom_my_bind = func.my_bind(obj)('tom', '男');
  console.log('---', tom_my_bind);
});

// #endregion

// #region 手写 去重

const arr = [1, 2, 2, 3, 4, 5, 6, 6, 7, 7, 8];

// Case 1 ::  set
function unique_set(arr) {
  return Array.from(new Set(arr));
}

(function () {
  console.log('unique_set', unique_set(arr));
});

// Case 2 :: Filter
function unique_filter(arr) {
  return arr.filter((a, i) => {
    return arr.indexOf(a) === i;
  });
}

(function () {
  console.log('unique_filter', unique_filter(arr));
});

// Case 3 :: push
function unique_push(arr) {
  let result = [];

  arr.map((a) => {
    if (result.indexOf(a) === -1) {
      result.push(a);
    }
  });

  return result;
}

(function () {
  console.log('unique_push', unique_push(arr));
});

// #endregion

// #region 手写 数组扁平化
const nestedArr = [1, 2, 3, [4, 5, [6, 7], [8, 9]], [10]];

// Case 1 :: 自带的
(function () {
  console.log(nestedArr.flat(2));
});

// Case 2 :: 使用 reduce + concat
function flat_arr(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((p, a) => {
      return p.concat(Array.isArray(a) ? flat_arr(a, depth - 1) : a);
    }, []);
  }

  return arr;
}

(function () {
  console.log(flat_arr(nestedArr, 2));
});

// Case3 :: toString

function flat_arr_string(arr) {
  return arr
    .toString()
    .split(',')
    .map((a) => parseFloat(a));
}

(function () {
  console.log(flat_arr_string(nestedArr));
});

// Case 4 :: RegExp
function flat_arr_regexp(arr) {
  return JSON.stringify(arr)
    .replace(/(\[|\])/g, '')
    .split(',')
    .map((a) => parseFloat(a));
}

(function () {
  console.log(flat_arr_regexp(nestedArr));
});

// Case 5 :: some

function flat_arr_some(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }

  return arr;
}

(function () {
  console.log(flat_arr_some(nestedArr));
});

// #endregion

// #region 手写 fibonacci 数列

// Case 1 :: 经典写法
function fibonacci(n) {
  if (n < 2) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

(function () {
  console.log(fibonacci(5));
  console.log(fibonacci(10));
  console.log(fibonacci(13));
});

// Case 2 :: 缓存数据写法

function fibonacci_closure(n) {
  let arr = [0, 1];

  function innerFunc(n) {
    let result = arr[n];

    if (typeof result !== 'number') {
      result = innerFunc(n - 1) + innerFunc(n - 2);
      arr[n] = result;
    }

    return result;
  }

  return innerFunc(n);
}

(function () {
  console.log(fibonacci_closure(5));
  console.log(fibonacci_closure(10));
  console.log(fibonacci_closure(13));
  // console.log(fibonacci_closure(18));
});

// #endregion

// #region 快速输出 0-99

// Case 1 ::
(function () {
  Array.from(new Array(100).keys()).map((a) => {
    // console.log(a);
  });
});

// Case 2 ::
(function () {
  [...new Array(100).keys()].map((a) => {
    // console.log(a);
  });
});

// Case3 :: for
(function () {
  for (let i = 0; i < 100; i++) {
    // console.log(i);
  }
});

// Case 4 :: while
(function () {
  function a() {
    let n = 0;
    while (n < 100) {
      console.log(n);
      n = n + 1;
    }
  }

  a();
});

// Case 5 :: length
(function () {
  Array.from({ length: 100 }, (v, i) => {
    console.log(i);
  });
});

(function () {
  Object.keys(Array.apply(null, { length: 100 })).map((d) => {
    console.log(parseFloat(d));
  });
});

// #endregion

// #region 冒泡排序

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

// console.log(bubbleSort([1, 3, 4, 5, 6, 7, 2, 1, 22]));

// #endregion
