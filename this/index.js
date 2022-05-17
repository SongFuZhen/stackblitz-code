// This
console.log('-------------- This --------------');

// 手写 deep_clone

(function () {
  function deep_clone(obj, map = new Map()) {
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

    for (let key in obj) {
      // 判断是否是自身属性
      if (obj.hasOwnProperty(key)) {
        objClone[key] = deep_clone(obj[key], map);
      }
    }

    return objClone;
  }

  let arr = [];

  arr = [
    '1',
    2,
    { name: 'tom', company: { name: 'google' } },
    new Date(),
    /[1-9]/g,
    function func() {
      return 'func';
    },
  ];

  arr.push(arr);

  const data = deep_clone(arr);
  data[0] = 1;

  console.log('data', data, 'arr', arr);
})();
