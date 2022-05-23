// 手写
console.log('2022-5-23');

// #region 深拷贝

const deep_clone = (obj, map = new Map()) => {
  if (obj === null || obj instanceof Date || obj instanceof RegExp) {
    return obj;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  if (map.get(obj)) {
    return map.get(obj);
  }

  const objClone =
    Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};

  map.set(obj, objClone);

  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objClone[key] = deep_clone(obj[key], map);
    }
  }

  return objClone;
};

let arr = [];
arr = [
  1,
  '2',
  undefined,
  null,
  '',
  { name: 'tom', company: 'hello' },
  new Date(),
  /[a-z]/g,
  function () {},
];

(function () {
  console.log('origin arr', arr);

  const cloneArr = deep_clone(arr);

  arr[5].name = 'jerry';
  console.log('change arr', arr);
  console.log('clone arr ', cloneArr);
});

// #endregion
