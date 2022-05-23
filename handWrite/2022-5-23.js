// 手写
console.log('2022-5-23');

// #region Promise 的应用

// #region Case1 使用 Promise 实现每隔 1s 输出 1，2，3

const run = (arr) => {
  return arr.reduce((p, x) => {
    return p.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(x, new Date().getSeconds());
          resolve(x);
        }, 1000);
      });
    });
  }, Promise.resolve());
};

(function () {
  const arr = [1, 2, 3];
  run(arr);
});

// #endregion

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
const light = (timer, cb) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb());
    }, timer);
  });
};

const step = () => {
  Promise.resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(2000, yellow);
    })
    .then(() => {
      return light(1000, green);
    });
  // .then(() => {
  //   step();
  // });
};

(function () {
  console.log('start', new Date().getSeconds());
  step();
});

// #endregion

// #region 实现 mergePromise 函数

const time = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};

const ajax1 = () =>
  time(2000).then(() => {
    console.log(1, new Date().getSeconds());
    return 1;
  });

const ajax2 = () =>
  time(2000).then(() => {
    console.log(2, new Date().getSeconds());
    return 2;
  });

const ajax3 = () =>
  time(4000).then(() => {
    console.log(3, new Date().getSeconds());
    return 3;
  });

function mergePromise(arr) {
  const data = [];

  // return arr.reduce((p, x) => {
  //   return p.then(() => {
  //     return new Promise((r) => {
  //       x().then((d) => {
  //         data.push(d);
  //         r(data);
  //       });
  //     });
  //   });
  // }, Promise.resolve());

  let promise = Promise.resolve();

  arr.forEach((ajax) => {
    promise = promise.then(ajax).then((d) => {
      data.push(d);
      return data;
    });
  });

  return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log('done', new Date().getSeconds());
  console.log(data, new Date().getSeconds());
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// #endregion

// #endregion

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
