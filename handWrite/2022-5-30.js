// #region Case2: 使用Promise实现红绿灯交替重复亮, 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次

function red() {
  console.log('red', new Date().getSeconds());
}

function green() {
  console.log('green', new Date().getSeconds());
}

function yellow() {
  console.log('yellow', new Date().getSeconds());
}

// 亮灯
function light(timer, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb());
    }, timer);
  });
}

(function () {
  function step() {
    console.log('start', new Date().getSeconds());

    Promise.resolve()
      .then(() => {
        return light(3000, red);
      })
      .then(() => {
        return light(2000, yellow);
      })
      .then(() => {
        return light(1000, green);
      })
      .then(() => {
        step();
      });
  }

  step();
})();

// #endregion

// #region Case1 使用 Promise 实现每隔 1s 输出 1，2，3
(function () {
  console.log('start', new Date().getSeconds());

  const arr = [1, 2, 3];

  arr.reduce((p, x) => {
    return p.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(console.log(x, new Date().getSeconds()));
        }, 1000);
      });
    });
  }, Promise.resolve());
});

// #endregion

// #region 深拷贝 PASS

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

(function () {
  let arr = [];

  arr = [
    1,
    '2',
    new Date(),
    /[a-z]/g,
    null,
    undefined,
    { name: 'tom', company: 'tom' },
  ];

  arr.push(arr);

  const arr_deep = deep_clone(arr);
  arr[0] = 2;
  arr[6].name = 'jerry';

  console.log('arr', arr);
  console.log('arr_deep', arr_deep);
});

// #endregion
