console.log('---Bind---');

Function.prototype.my_bind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type error');
  }

  // 第一个参数是 this，所以获取到剩余的参数
  const args = [...arguments].slice(1);

  const fn = this;

  return function NewFunc() {
    return fn.apply(
      this instanceof NewFunc ? this : context, // 当作构造函数的时候，this 指向实例，绑定为 this，可以让实例获得来自绑定函数的值；当作为普通函数的时候， this 指向 window，绑定为 context
      args.concat([...arguments]) // 当前的这个 arguments 是指 Fn 的参数
    );
  };
};

Function.prototype.my_bind_2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type error');
  }

  var fn = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return fn.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

let value = 2;

let foo = {
  value: 1,
};

// object
function bar(name, age) {
  // return {
  //   value: this.value,
  //   name: name,
  //   age: age,
  // };

  console.log({
    value: this.value,
    name: name,
    age: age,
  });

  return true;
}

bar.prototype.friend = 'jerry';

console.log(bar.call(foo, 'Jack', 20)); // 直接执行了函数

let bindFoo1 = bar.bind(foo, 'Jack', 20); // 返回一个函数
console.log('bindFoo1', bindFoo1());

let bindFoo1_my = bar.bind(foo, 'Jack', 20); // 返回一个函数
console.log('bindFoo1_my', bindFoo1_my());

let bindFoo2 = bar.bind(foo, 'Jack'); // 返回一个函数，继续传参, 柯里化
let obj = new bindFoo2(20);
console.log('obj', obj);
console.log('obj.friend', obj.friend); // undefined

let bindFoo2_my = bar.my_bind(foo, 'Jack'); // 返回一个函数，继续传参, 柯里化
let obj_my = new bindFoo2(20);
console.log('obj_my', obj_my);
console.log('obj_my.friend', obj_my.friend); // undefined
