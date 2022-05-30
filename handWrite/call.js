console.log('--- Call ---');

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }

  // 删除第一个个参数
  let args = [...arguments].slice(1);

  let result = null;

  // 判断 context 是否传入了，没有就设置为 window
  context = context || window;

  // 将被调用的方法设置为 context 的属性
  // this 就是我们要调用的方法
  context.fn = this;

  // 执行要被调用的方法
  result = context.fn(...args);

  // 删除手动增加的属性方法
  delete context.fn;

  return result;
};

const obj = {
  value: 'tom',
};

function func() {
  console.log(this.value);
}

func.call(obj);

func.myCall(obj);
