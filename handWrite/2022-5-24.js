console.log('2022-5-24');

// #region 手写图片加载

// 异步加载图片
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      console.log('Image loaded');
      resolve(img);
    };

    img.onerror = function () {
      reject(new Error('Image Error'));
    };

    img.src = url;
  });
}

// 图片数组

/**
 * 思路:
 * 1、使用 Promise.race 请求最快的图片
 * 2、一个请求完成之后，返回  Index，然后用新的图片替换下标，继续使用 Race 请求
 * 3、最后使用 Promise.all 请求全部
 */
function loadImageLimit(imageArr, limitCount, handler) {
  const allImages = [].concat(imageArr);

  const promises = allImages.splice(0, limitCount).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });

  return allImages
    .reduce((p, url) => {
      return p
        .then(() => {
          return Promise.race(promises);
        })
        .then((fastestIndex) => {
          console.log('fastestIndex', fastestIndex);
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex;
          });
        })
        .catch((err) => {
          console.log('load error', err);
        });
    }, Promise.resolve())
    .then(() => {
      return Promise.all(promises);
    });
}

import { urls } from '../constant.js';

(function () {
  loadImageLimit(urls, 3, loadImage).then((res) => {
    console.log('图片全部加载完毕', res);
  });
});

// #endregion

// #region 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。

const time = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};

const ajax1 = () =>
  time(2000).then(() => {
    console.log(1);
    return 1;
  });

const ajax2 = () =>
  time(1000).then(() => {
    console.log(2);
    return 2;
  });

const ajax3 = () =>
  time(1000).then(() => {
    console.log(3);
    return 3;
  });

function mergePromise(ajaxArr) {
  // 在这里写代码

  let data = [];

  // let promise = Promise.resolve();

  // ajaxArr.forEach((ajax) => {
  //   // ajax().then((res) => {
  //   //   data.push(res);
  //   //   return data;
  //   // });

  //   promise = promise.then(ajax).then((res) => {
  //     data.push(res);
  //     return data;
  //   });
  // });

  // return promise;

  return ajaxArr.reduce((p, ajax) => {
    return p.then(ajax).then((res) => {
      data.push(res);
      return data;
    });
  }, Promise.resolve());
}

(function () {
  mergePromise([ajax1, ajax2, ajax3]).then((data) => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
  });
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// #endregion

// #region 使用Promise实现红绿灯交替重复亮。红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？

function red() {
  console.log('red', new Date().getSeconds());
}

function green() {
  console.log('green', new Date().getSeconds());
}

function yellow() {
  console.log('yellow', new Date().getSeconds());
}

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
    })
    .then(() => {
      step();
    });
};

(function () {
  step();
});

// #endregion
