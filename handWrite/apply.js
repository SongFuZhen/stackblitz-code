console.log('--- Apply ---');

Function.prototype.my_apply = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  let result = null;
  context = context || window;

  // 使用 Symbol 保证属性的唯一
  // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  // 执行要被调用的方法
  if (arguments[1]) {
    result = context[fnSymbol](...arguments[1]);
  } else {
    result = context[fnSymbol]();
  }

  delete context[fnSymbol];

  return result;
};

var obj = {
  value: 'tom',
};

function func(sex, age) {
  console.log(this.value, sex === 0 ? '男' : '女', age);
}

func.call(obj, 0, 20);

func.apply(obj, [1, 22]);
func.my_apply(obj, [0, 23]);
