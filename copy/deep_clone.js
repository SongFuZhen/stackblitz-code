/**
 * 手写 深拷贝
 * 思路:
 * 如果是 原始类型，直接返回
 * 如果是对象，需要处理
 * 如果是循环引用对象，circular reference, 直接从 map 中返回
 * 使用 for...in 进行循环赋值
 */

function deep_clone(obj, map = new Map()) {
  if (obj === null || obj instanceof Date || obj instanceof RegExp) {
    return obj;
  }

  // typeof null 是 object
  if (typeof obj !== 'object') {
    return obj;
  }

  if (map.get(obj)) {
    return map.get(obj);
  }

  // 防止 Array.isArray 被重写
  let cloneObj =
    Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};

  // Array 自带
  // let cloneObj = Array.isArray(obj) ? [] : {};

  // 需要考虑 null, undefined 等
  // let cloneObj = new obj.constructor();
  // let cloneObj = obj.__proto__.constructor();

  map.set(obj, cloneObj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deep_clone(obj[key], map);
    }
  }

  return cloneObj;
}

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

const test_1 = deep_clone(arr);
test_1[2].name = 'jerry';

console.log('test_1', test_1, ', arr ::', arr);
console.log('tt', test_1[2].name === arr[2].name);
