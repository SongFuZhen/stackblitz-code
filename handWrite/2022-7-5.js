console.log('2022-7-5');

// #region 手写 call
// 手写 call 方法
// 1、判断是否是函数，不是就报错
// 2、设置 context，如果没设置，则设置为 window
// 3、设置一个变量，将变量添加到 context 上去
// 4、调用 函数，取得返回值
// 5、删除自定义变量

Function.prototype.my_call_0705 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('not function');
  }

  context = context || window;

  const fnSymbol = Symbol();

  context[fnSymbol] = this;

  const args = [...arguments].slice(1);

  const result = context[fnSymbol](...args);

  delete context[fnSymbol];

  return result;
};

value = 0;

const obj = {
  value: 1,
};

function func(name, age) {
  const result = {
    value: this.value,
    name,
    age,
  };

  console.log(result);
}

(function () {
  func('tom', 20);
  func.my_call_0705(obj, 'tom', 20);
});

// #endregion

// #region 手写 apply 方法
/**
 * 1、判断是否是函数，不是就报错
 * 2、判断 context 是否传递了，没有设置为 window
 * 3、新增 context 的变量
 * 4、执行函数
 * 4-1、如果没有参数，直接执行
 * 4-2、如果有参数，解构参数，执行
 * 5、删除自定义变量
 * 6、返回数据
 */

Function.prototype.my_apply_0705 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('not function');
  }

  context = context || window;

  const fnSymbol = Symbol();

  context[fnSymbol] = this;

  let result;
  if (arguments[1]) {
    result = context[fnSymbol](...arguments[1]);
  } else {
    result = context[fnSymbol]();
  }

  delete context[fnSymbol];

  return result;
};

(function () {
  func('tom', 20);
  func.my_apply_0705(obj, ['tom', 20]);
});
// #endregion

// #region 手写 new

/**
 * 1、获取构造函数，删除参数的第一项
 * 2、创建一个空对象，将构造函数赋值给这个对象
 * 3、判断 优先返回构造函数对象
 */
function my_new_0705() {
  // 转换成数组

  const args = [...arguments];

  const Con = args.shift();
  // const Con = Array.prototype.shift.call(arguments);

  const obj = Object.create(Con.prototype);

  const result = Con.my_apply_0705(obj, args);

  return result instanceof Object ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.eat = function () {
  console.log('Eatting');
};

(function () {
  var tom = my_new_0705(Person, 'Tom', 20);
  console.log(tom); // Person{ name: 'Tom' }
  tom.eat(); // 'Eatting'
});

// #endregion

// #region 手写 instanceof

function my_instanceof_0705(obj, origin) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  if (typeof origin !== 'function') {
    // throw new Error('not function');
    console.error('origin is not a function');
    return false;
  }

  let objProto = Object.getPrototypeOf(obj);

  while (objProto) {
    if (objProto === origin.prototype) {
      return true;
    }

    objProto = Object.getPrototypeOf(objProto);
  }

  return false;
}

(function () {
  const num = 1;

  console.log(my_instanceof_0705(num, Object));

  const obj = {
    name: 'tom',
  };

  console.log(my_instanceof_0705(obj, Object));
  console.log(my_instanceof_0705(obj, String));
  console.log(my_instanceof_0705(obj, null));
});

// #endregion

// #region 手写 扁平化数组 flat arr

function flat_arr_0705_string(arr) {
  return arr
    .toString()
    .split(',')
    .map((d) => parseInt(d));
}

function flat_arr_0705_with_depth(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((p, x) => {
      return p.concat(
        Array.isArray(x) ? flat_arr_0705_with_depth(x, depth - 1) : x
      );
    }, []);
  }

  // return [...arr];
  return arr.slice();
}

function flat_arr_0705_regExp(arr) {
  return JSON.stringify(arr)
    .replaceAll(/(\[|\])/g, '')
    .split(',')
    .map((d) => parseInt(d));
}

function flat_arr_0705_some(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }

  return arr;
}

(function () {
  const arr = [0, [1], [2, 3, [4, 5]]];

  console.log(arr.flat(2));
  console.log(Array.prototype.flat.call(arr, 2));

  console.log(flat_arr_0705_string(arr));
  console.log(flat_arr_0705_regExp(arr));
  console.log(flat_arr_0705_some(arr));
  console.log(flat_arr_0705_with_depth(arr, 1));
});

// #endregion

// #region 手写 array reduce
/**
 * 传入统计值和初始值
 * 如果没有初始值，那么就从 1 开始计算
 * 如果有，那么就从 0 开始计算
 */

Array.prototype.my_reduce_0705 = function (reducer, initValue) {
  const arr = this;

  let total = initValue ? initValue : arr[0];

  for (let i = initValue ? 1 : 0; i < arr.length; ++i) {
    total = reducer(total, arr[i], i, arr);
  }

  return total;
};

(function () {
  const arr = [1, 2, 3, 4];

  const result = arr.my_reduce_0705((p, x, i, arr) => {
    // console.log(x, i, arr);
    return p * x;
  });

  console.log(result);
});

// #endregion

// #region 手写 快速排序算法
function quickSort0705(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr.shift();

  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  const leftArr = quickSort0705(left);
  const rightArr = quickSort0705(right);

  return leftArr.concat([pivot], rightArr);
}

// #endregion

// #region 手写 冒泡排序

/**
 * 可以添加上done 来进行减少排序次数
 */
function bubbleSort0705(arr) {
  for (let i = 0; i < arr.length; ++i) {
    let done = true;
    for (let j = 0; j < arr.length - 1 - i; ++j) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;

        done = false;
      }
    }

    if (done) {
      break;
    }
  }

  return arr;
}

(function () {
  const arr = [444, 555, 39, 11, 0, 2, 1, 2, 1, 111, 1, 33];

  const testArr = Array.from({ length: 100 }).map(() => {
    return Math.floor(Math.random() * 100);
  });

  const testArr2 = Array.from(new Array(100).keys()).map((d) => {
    return Math.floor(Math.random() * d);
  });

  console.log(quickSort0705(arr));
  console.log(quickSort0705(testArr));
  console.log(quickSort0705(testArr2));
});

// #endregion

// #region 手写 单链表反转

function linReverse0705(root) {
  let cur = root;
  let pre = null;

  while (cur) {
    if (cur.next) {
      pre = cur;
      cur = cur.next;
    }
  }

  return pre;
}

(function () {
  let link0705 = {
    a: 1,
    next: {
      a: 2,
      next: {
        a: 3,
        next: {
          a: 4,
          next: null,
        },
      },
    },
  };

  console.log(linReverse0705(link0705));
})();

// #endregion
