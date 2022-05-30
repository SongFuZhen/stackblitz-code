// #region 封装一个异步加载图片的方法

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      console.log('load success');
      resolve(img);
    };

    img.onerror = function () {
      reject(new Error('img load error'));
    };

    img.src = url;
  });
}

// #endregion

// #region 11张图片，限制异步操作的并发个数并尽可能快的完成全部

function limitLoadImages(images, limitCount, handler) {
  let promises = images.splice(0, limitCount).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });

  return images.reduce((p, url) => {
    return p
      .then(() => {
        return Promise.race(promises);
      })
      .then((fastestIndex) => {
        promises[fastestIndex] = handler(url).then(() => {
          return fastestIndex;
        });

        console.log(
          'fastestIndex :: ',
          fastestIndex,
          limitCount + images.indexOf(url)
        );
      })
      .then(() => {
        return Promise.all(promises);
      });
  }, Promise.resolve());
}

const urls = [
  'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/28/1708b0d2d7baa165~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://image-static.segmentfault.com/127/150/1271505701-5a659863bb046_fix732',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a61ca07672a45d3aecf382100cc9719~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55df6cb63d3346be9ec1f572a1514853~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c5c43d1c584ed4b8e4cce8855bab52~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e15fc609aa84eac973c5b8ff163c11c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb543f2fdc634e29add495b8f2ff048f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ff1ec224244427ba9f15abecbd668fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e35285a8d23a4a4380676aeb681e815d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b74c746d1459403382fd0bbc1d96aeca~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77972f24d69243bb93679f155f305095~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
];

(function () {
  limitLoadImages(urls, 3, loadImg).then((res) => {
    console.log('图片全部加载完毕--', res);
  });
})();

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

  // 写法1
  // return arr.reduce((p, x) => {
  //   return p.then(() => {
  //     return x().then((r) => {
  //       data.push(r);
  //       return data;
  //     });
  //   });
  // }, Promise.resolve());

  // 写法2
  let promise = Promise.resolve();

  arr.forEach((a) => {
    promise = promise.then(a).then((r) => {
      data.push(r);
      return data;
    });
  });

  return promise;
}

// 执行 MergePromise
(function () {
  mergePromise([ajax1, ajax2, ajax3]).then((data) => {
    console.log('done', new Date().getSeconds());
    console.log(data, new Date().getSeconds());
  });
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

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
      });
    // .then(() => {
    //   step();
    // });
  }

  step();
});

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
