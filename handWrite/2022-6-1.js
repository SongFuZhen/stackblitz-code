console.log('--- 2022-6-1 ---');

// #region 手写 new

function my_new() {
  // 1. 获取构造函数，参数删除第一项
  const Con = Array.prototype.shift.call(arguments);

  // 2. 创建一个空的对象，并链接到原型
  const obj = Object.create(Con.prototype);

  // 3. 获取 ret，使用 apply 执行
  const ret = Con.apply(obj, arguments);

  // 4. 优先返回对象
  return ret instanceof Object ? ret : obj;
}

let value = 1;
function Person(name) {
  const result = {
    value: this.value,
    name,
  };

  console.log('result', result);

  // 是否返回对象
  // return result;
}

Person.prototype.eat = 'Eatting';

const tom = new Person('tom');
console.log('tom', tom, tom.eat);

const tom_my = my_new(Person, 'tom');
console.log('tom_my', tom_my, tom_my.eat);

// #endregion

// #region 手写 call

Function.prototype.my_call = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  // 获取参数，除了第一项
  const args = [...arguments].slice(1);

  context = context || window;

  // 给context 设置一个属性 fnSymbol
  const fnSymbol = Symbol();

  // 将 this 设置给属性 fnSymbol
  context[fnSymbol] = this;

  // 执行
  const result = context[fnSymbol](...args);

  // 删除添加的属性
  delete context[fnSymbol];

  return result;
};

const obj = {
  value: 2,
};

function func(name) {
  const result = {
    value: this.value,
    name,
  };

  return result;
}

const call = func.call(obj, 'tom');
console.log('call', call);

const my_call = func.my_call(obj, 'tom');
console.log('my_call', my_call);

// #endregion

// #region 手写 apply

Function.prototype.my_apply = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  // 给 context 创建属性 fnSymbol
  const fnSymbol = Symbol();

  context = context || window;

  // 将 this 赋值给 context[fnSymbol]
  context[fnSymbol] = this;

  let result;

  // 如果有参数，
  if (arguments[1]) {
    result = context[fnSymbol](...arguments[1]);
  } else {
    result = context[fnSymbol]();
  }

  delete context[fnSymbol];

  return result;
};

const apply = func.apply(obj, ['tom']);
console.log('apply', apply);

const my_apply = func.my_apply(obj, ['tom']);
console.log('my_apply', my_apply);

// #endregion

// #region 手写 bind

// 返回的是一个函数
Function.prototype.my_bind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  const args = [...arguments].slice(1);
  const fn = this;

  return function Func() {
    return fn.apply(
      this instanceof Func ? this : context,
      args.concat(...arguments)
    );
  };
};

const bind = func.bind(obj);
console.log('bind', bind('tom'));

const my_bind = func.my_bind(obj);
console.log('my_bind', my_bind('tom'));

// #endregion

// #region 防抖  debounce
// 在频繁操作的下，不执行，只有在停止操作一段时间后才执行

// 通过 判断当前时间 和 setTimeout 执行
function debounce(func, timer) {
  let timeout = undefined;

  const debounced = function () {
    const context = this;
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      func.apply(context, args);
    }, timer);
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = undefined;
  };

  return debounced;
}

(function () {
  const divContainer = document.createElement('div');
  divContainer.id = 'debounce_6-1';
  divContainer.className = 'main';
  divContainer.innerHTML = 'Debounce 6-1';
  document.getElementById('app').appendChild(divContainer);

  let count = 1;
  function func() {
    divContainer.innerHTML = count++;
    console.log('count', count);
  }

  divContainer.onmousemove = debounce(func, 2000);
})();

// #endregion
