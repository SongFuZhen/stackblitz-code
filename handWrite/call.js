console.log('--- Call ---');

Function.prototype.my_call = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  console.log('arguments', arguments);

  // 删除第一个个参数
  // const args = { ...[...arguments].slice(1) };
  const args = [...arguments].slice(1);

  console.log('args', args);
  console.log('---', this, arguments, context);

  let result = null;

  // 判断 context 是否传入了，没有就设置为 window
  context = context || window;

  // 将被调用的方法设置为 context 的属性
  // this 就是我们要调用的方法
  context.fn = this;

  // 执行要被调用的方法
  // result = context.fn(...args);
  result = context.fn(...args);

  console.log('context', context);

  // 删除手动增加的属性方法
  delete context.fn;

  return result;
};

const obj = {
  value: 'tom',
};

function func(age, school) {
  console.log(this.value, age, school);
}

func.call(obj, 10, 't');

func.my_call(obj, 20, 'm');
