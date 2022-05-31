console.log('2022-5-31');

//#region 手写 new

/**
 * 1. 获取构造函数，删除第一项
 * 2. 创建一个空对象，并链接到构造函数的原型
 * 3. 使用 apply 改变 this指向
 * 4. 优先返回对象
 */
function my_new() {
  const Con = Array.prototype.shift.call(arguments);
  const obj = Object.create(Con.prototype);
  const ret = Con.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}

// #endregion

//#region 手写 call
Function.prototype.my_call = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  // 获取参数
  const args = [...arguments].slice(1);

  // 定义 变量
  const fnSymbol = Symbol();

  context = context || window;

  // 赋值
  context[fnSymbol] = this;

  console.log('.args.', ...args);

  // 执行函数
  const result = context[fnSymbol](...args);

  // 删除
  delete context[fnSymbol];

  return result;
};

// #endregion

//#region 手写 apply

Function.prototype.my_apply = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  context = context || window;

  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  let result = '';

  if (arguments[1]) {
    console.log('..arguments[1]..', ...arguments[1]);
    result = context[fnSymbol](...arguments[1]);
  } else {
    result = context[fnSymbol]();
  }

  return result;
};

// #endregion

//#region 手写 bind

Function.prototype.my_bind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  const args = [...arguments].slice(1);

  const fn = this;

  return function Fn() {
    // console.log('--- has new ---', this instanceof Fn);

    return fn.apply(
      this instanceof Fn ? this : context, // 是不是有 new
      args.concat(...arguments)
    );
  };
};

// #endregion

// #region Test

var value = 1;
const obj = {
  value: 2,
};

function func(name, age) {
  const result = {
    value: this.value,
    name,
    age,
  };

  console.log(result);

  // return result;
  return '---func result----';
}

const tom_call = func.call(obj, 'tom', 20);
console.log('tom_call', tom_call);

const tom_my_call = func.my_call(obj, 'tom', 20);
console.log('tom_my_call', tom_my_call);

const tom_apply = func.apply(obj, ['tom', 22]);
console.log('tom_apply', tom_apply);

const tom_my_apply = func.my_apply(obj, ['tom', 2]);
console.log('tom_my_apply', tom_my_apply);

const tom_bind_name_age = func.bind(obj, 'tom', 20);
console.log('tom_bind_name_age', tom_bind_name_age());

const tom_my_bind_name_age = func.my_bind(obj, 'tom', 20);
console.log('tom_my_bind_name_age', tom_my_bind_name_age());

// 柯里化
const tom_bind_name = func.bind(obj, 'tom');
console.log('tom_bind_name', tom_bind_name(20));

const tom_my_bind_name = func.my_bind(obj, 'tom');
console.log('tom_my_bind_name', tom_my_bind_name(20));

const new_tom_my_bind_name = new tom_my_bind_name(20);
console.log('new_tom_my_bind_name', new_tom_my_bind_name);

// #endregion
