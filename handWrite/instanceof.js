console.log('instanceof');

function my_instanceof(target, origin) {
  // 如果是基本数据类型，返回 false
  if (typeof target !== 'object' || target === null) {
    return false;
  }

  // 如果不是 function, 报错
  if (typeof origin !== 'function') {
    throw new TypeError('origin must be function');
  }

  let proto = Object.getPrototypeOf(target); // 相当于 proto = target.__proto__;

  while (proto) {
    console.log('proto', proto);

    if (proto === origin.prototype) {
      return true;
    }

    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

const obj = {
  value: 1,
  name: 'tom',
};

function Person() {
  console.log('xx');
}

const p1 = new Person();

console.log(p1 instanceof Object);
console.log(my_instanceof(p1, Object));
