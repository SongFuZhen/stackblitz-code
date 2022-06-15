console.log('2022-6-15');

// #region 手写一个 new

/**
 * new 的原理
 * 1、首先 要获取一个 构造函数
 * 2、创建一个空对象，将对象的原型设置为构造函数的原型
 * 3、使用 apply 执行构造函数，改变 this 指向为 obj
 * 4、优先返回构造函数返回的对象
 */

function my_new() {
  const Con = Array.prototype.shift.call(arguments);

  const Obj = Object.create(Con.prototype);

  const result = Con.apply(Obj, arguments);

  return result instanceof Object ? result : Obj;
}

// #endregion

// #region 手写一个 apply

/**
 * 手写 apply
 * 首先判断是否是 function ，不是就报错
 * 然后生成一个 symbol 的属性
 * 执行函数，返回值
 */
Function.prototype.my_apply_615 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('xxx');
  }

  // 如果没有 context 就设置为 window
  context = context || window;

  // 添加一个属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  let result = null;

  // 有参数
  if (arguments[1]) {
    result = context[fnSymbol](...arguments[1]);
  } else {
    // 没有参数
    result = context[fnSymbol]();
  }

  // 删除手动添加的属性
  delete context[fnSymbol];

  return result;
};

(function () {
  value = 1;
  const obj = { value: 2 };

  function func(name, age) {
    const result = {
      value: this.value,
      name,
      age,
    };

    console.log('result', result);
  }

  // 正常调用
  // func('tom');

  // func.apply(obj, ['tom']);
  func.my_apply_615(obj, ['tom', 20]);
});

// #endregion

// #region 手写 call

(function () {
  /**
   * Call 逻辑
   * 1、判断是否是 function ，不是就报错
   * 2、设置 context 为 context ||  window
   * 3、创建属性 fnSymbol , 添加到 context 上
   * 4、执行 函数
   * 5、删除 新增加的属性，返回结果
   */
  Function.prototype.my_call_615 = function (context) {
    if (typeof this !== 'function') {
      throw new Error('xx');
    }

    context = context || window;

    const fnSymbol = Symbol();
    context[fnSymbol] = this;

    let result = null;

    // 获取参数
    const args = [...arguments].slice(1);

    result = context[fnSymbol](...args);

    delete context[fnSymbol];

    return result;
  };

  value = 1;
  const obj = {
    value: 2,
  };

  function func(name, age) {
    const result = {
      value: this.value,
      name,
      age,
    };

    console.log('result', result);
  }

  // func.call(obj, 'tom', 20);
  func.my_call_615(obj, 'tom', 20);
});

// #endregion

// #region 手写一个 bind

/**
 * bind 逻辑
 * 1、判断是否是 函数
 *
 *
 * 最终返回一个函数
 */
Function.prototype.my_bind_615 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('type error ');
  }

  const fn = this;
  const args = [...arguments].slice(1);

  return function newFn() {
    return fn.apply(
      this instanceof newFn ? this : context,
      args.concat([...arguments])
    );
  };
};

(function () {
  value = 2;

  let foo = {
    value: 1,
  };

  // object
  function bar(name, age) {
    const result = {
      value: this.value,
      name: name,
      age: age,
    };

    console.log('result', result);

    // return true;
  }

  bar.bind(foo)('tom', 20);
  bar.my_bind_615(foo)('tom');
});

// #endregion

// #region 手写 instanceof

/**
 * 手写 instanceof
 * target 原始的对象
 * source 标准的要对比的对象
 * 如果是基本类型，直接返回 false
 * 如果是 null/ Date / RegExp，直接返回 false
 * 循环判断 __prop__ 是否相等
 * 最终返回 true / false
 */
function my_instanceof_615(target, source) {
  if (typeof target !== 'object' || target === null) {
    return false;
  }

  if (typeof source !== 'function') {
    throw new Error('xx');
  }

  // 这里要注意
  let targetProto = Object.getPrototypeOf(target);

  while (targetProto) {
    if (targetProto === source.prototype) {
      return true;
    }

    targetProto = Object.getPrototypeOf(targetProto);
  }

  return false;
}

(function () {
  function Person(name) {
    const result = {
      name,
    };

    console.log('result', result);

    // return result;
  }

  const p1 = new Person('tom');

  console.log('p1', p1);

  console.log(p1 instanceof Function);
  console.log(Person instanceof Function);
  console.log(Person instanceof Object);
  console.log(my_instanceof_615(p1, Person));
  console.log(my_instanceof_615(p1, Object));
});

// #endregion

// #region 手写 reduce

Array.prototype.my_reduce_615 = function (reducer, initValue) {
  const arr = this;

  let total = initValue ? initValue : arr[0];

  for (let i = initValue ? 0 : 1; i < arr.length; i++) {
    total = reducer(total, arr[i], i, arr);
  }

  return total;
};

(function () {
  const arr = [1, 2, 3, 4];

  const sumArr = arr.my_reduce_615((p, c, i, array) => {
    return p + c;
  }, 0);

  console.log('sumArr', sumArr);
});

// #endregion

// #region 手写 深拷贝

function deep_clone_615(obj, map = new Map()) {
  // 基本类型直接返回
  if (
    typeof obj !== 'object' ||
    obj === null ||
    obj instanceof Date ||
    obj instanceof RegExp
  ) {
    return obj;
  }

  if (map.get(obj)) {
    return map.get(obj);
  }

  const objClone =
    Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
  // const objClone = Array.isArray(obj) ? [] : {};

  map.set(obj, objClone);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objClone[key] = deep_clone_615(obj[key], map);
    }
  }

  return objClone;
}

(function () {
  let arr = [];

  arr = [
    1,
    2,
    { name: 'tom', company: { name: 'baidu' } },
    undefined,
    null,
    '',
    new Date(),
    /[1-9]/g,
    () => {
      return '()=>void';
    },
    function () {
      return 'funcs';
    },
  ];

  arr.push(arr);

  const test_1 = deep_clone_615(arr);
  test_1[2].name = 'jerry';

  console.log('test_1', test_1, ', arr ::', arr);
  console.log('tt', test_1[2].name === arr[2].name);
});

// #endregion
