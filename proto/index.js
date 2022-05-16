function func() {
  // return 1;
  return 'func';
}

// new
const f1 = new func();
const f2 = new func();

console.log('------------ 原型 ------------');
console.log('func 的原型 :: ', func.prototype);
console.log('func 的原型的构造函数 = func', func.prototype.constructor == func);

console.log('f1 的原型 ::', f1.__proto__);
console.log('f2 的原型 ::', f2.__proto__);

console.log('f1 的原型的构造函数 ::', f1.__proto__.constructor);
console.log('f2 的原型的构造函数 ::', f2.__proto__.constructor);

console.log('f1 的原型的构造函数 = func', f1.__proto__.constructor === func);

console.log('------- Function 原型链 ------- ');
console.log('Function 的原型 :: ', Function.prototype);
console.log(
  'func的原型 = Function 的原型',
  func.__proto__ === Function.prototype
);

console.log(
  'func的原型的原型 = Object 的原型',
  func.__proto__.__proto__ === Object.prototype
);

console.log('------- Object 原型链 ------- ');
console.log('Object 的原型 ::', Object.prototype);

console.log('func 的原型的 原型', func.prototype.__proto__);
console.log('f1 的原型的 原型 :: ', f1.__proto__.__proto__);

console.log(
  'func 的原型的原型 === Object 的原型',
  func.prototype.__proto__ === Object.prototype
);

console.log(
  'f1 的原型的原型 === Object 的原型',
  f1.__proto__.__proto__ === Object.prototype
);

console.log('Object 的原型的原型 = null', Object.prototype.__proto__ === null);

console.log('-------------- 原型的相等 --------------');

const equal_arr = [
  ['f1.__proto__', 'func.prototype'],
  ['func.prototype', 'func.prototype'],
  ['func.prototype.constructor', 'func'],
  ['func.__proto__', 'Function.prototype'],
  ['func.prototype.__proto__', 'Object.prototype'],

  ['Object.prototype', 'Object.prototype'],
  ['Object.prototype.constructor', 'Object'],
  ['Object.__proto__', 'Function.prototype'],

  ['Function.prototype', 'Function.prototype'],
  ['Function.prototype.constructor', 'Function'],
  ['Function.__proto__', 'Function.prototype'],

  ['Function.prototype.__proto__', 'Object.prototype'],
  ['Object.prototype.__proto__', 'null'],
];

for (let i = 0; i < equal_arr.length; i++) {
  const a = equal_arr[i][0];
  const b = equal_arr[i][1];

  console.log(`${i + 1}. ${a} === ${b} :: `, eval(a) === eval(b));
}

console.log('-------------- f1 的原型链 --------------');
console.log('f1.__proto__ -> func.prototype -> Object.prototype -> null');

console.log(
  'f1.__proto__ === func.prototype ->',
  'func.prototype.__proto__ === Object.prototype ->',
  'Object.prototype.__proto__ === null ->',
  'null'
);

console.log('-------------- func 的原型链 --------------');

console.log('func.__proto__ -> Function.prototype -> Object.prototype -> null');

console.log(
  'func.__proto__ === Function.prototype ->',
  'Function.prototype.__proto__ === Object.prototype ->',
  'Object.prototype.__proto__ === null ->',
  'null'
);
