// Promise
console.log('-------------- Promise --------------');

// Case 1-1
(function () {
  const promise = new Promise((resolve, reject) => {
    console.log('promise');
  });

  console.log('1.', promise);
});

// Case 1-2
(function () {
  const promise = new Promise((resolve, reject) => {
    console.log('1');
    resolve('success');
    console.log('2');
  });

  promise.then(() => {
    console.log('4');
  });

  console.log('3');
});

// Case 1-3
(function () {
  const promise = new Promise((resolve, reject) => {
    console.log('1');
    console.log('2');
  });

  promise.then(() => {
    console.log('3');
  });

  console.log('4');
});

// Case 1-4
(function () {
  const promise = new Promise((resolve, reject) => {
    console.log('promise');
    resolve('resolve1');
  });

  const promise_1 = promise.then((res) => {
    console.log(res);
  });

  console.log('1', promise);
  console.log('2', promise_1);
});

// Case 1-5
(function () {
  const fn = () =>
    new Promise((resolve, reject) => {
      console.log('1');
      resolve('success');
    });

  fn().then((res) => {
    console.log(res);
  });

  console.log('start');
});

// Case 1-6
(function () {
  const fn = () =>
    new Promise((resolve, reject) => {
      console.log('1');
      resolve('success');
    });

  console.log('start');

  fn().then((res) => {
    console.log(res);
  });
});

// Case 2-1
(function () {
  console.log('start');
  setTimeout(() => {
    console.log('time');
  }, 0);

  Promise.resolve().then(() => {
    console.log('resolve');
  });

  console.log('end');
});

// Case 2-2
(function () {
  const promise = new Promise((resolve, reject) => {
    console.log('1');
    setTimeout(() => {
      console.log('timer start');
      resolve('success');
      console.log('timer end');
    }, 0);
  });

  promise.then((res) => {
    console.log(res);
  });

  console.log('4');
});

// Case 2-3
(function () {
  setTimeout(() => {
    console.log('timer 1');
    setTimeout(() => {
      console.log('timer 3');
    }, 0);
  }, 0);

  setTimeout(() => {
    console.log('timer 2');
  }, 0);

  console.log('start');
});

// Case 2-4
(function () {
  setTimeout(() => {
    console.log('timer1');
    Promise.resolve().then(() => {
      console.log('promise');
    });
  }, 0);

  setTimeout(() => {
    console.log('timer2');
  }, 0);

  console.log('start');
});

// Case 2-5
(function () {
  Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
      console.log('timer2');
    }, 0);
  });

  const timer1 = setTimeout(() => {
    console.log('timer1');
    Promise.resolve().then(() => {
      console.log('promise2');
    });
  }, 0);

  console.log('start');
});

// Case 2-6
(function () {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 1000);
  });

  const promise2 = promise1.then(() => {
    throw new Error('error!!!');
  });

  console.log('promise1', promise1);
  console.log('promise2', promise2);

  setTimeout(() => {
    console.log('promise1', promise1);
    console.log('promise2', promise2);
  }, 2000);
});

// Case 2-7
(function () {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
      console.log('timer1');
    }, 1000);

    console.log('promise1里的内容');
  });

  const promise2 = promise1.then(() => {
    throw new Error('error!!!');
  });

  console.log('promise1', promise1);
  console.log('promise2', promise2);

  setTimeout(() => {
    console.log('timer2');
    console.log('promise1', promise1);
    console.log('promise2', promise2);
  }, 2000);
});

// Case 3-1
(function () {
  const promise = new Promise((resolve, reject) => {
    resolve('success1');
    reject('error');
    resolve('success2');
  });

  promise
    .then((res) => {
      console.log('then: ', res);
    })
    .catch((err) => {
      console.log('catch: ', err);
    });
});

// Case 3-2
(function () {
  const promise = new Promise((resolve, reject) => {
    reject('error');
    resolve('success2');
  });

  promise
    .then((res) => {
      console.log('then1: ', res);
    })
    .then((res) => {
      console.log('then2: ', res);
    })
    .catch((err) => {
      console.log('catch: ', err);
    })
    .then((res) => {
      console.log('then3: ', res);
    });
});

// Case 3-3
(function () {
  Promise.resolve(1)
    .then((res) => {
      console.log(res);
      return 2;
    })
    .catch((err) => {
      console.log('err', err);
      return 3;
    })
    .then((res) => {
      console.log(res);
    });
});

// Case 3-4
(function () {
  Promise.reject(1)
    .then((res) => {
      console.log(res);
      return 2;
    })
    .catch((err) => {
      console.log('err', err);
      return 3;
    })
    .then((res) => {
      console.log(res);
    });
});

// Case 3-5
(function () {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('timer');
      resolve('success');
    }, 1000);
  });

  const start = Date.now();

  promise.then((res) => {
    console.log(res, Date.now() - start);
  });

  promise.then((res) => {
    console.log(res, Date.now() - start);
  });
});

// Case 3-6
(function () {
  Promise.resolve()
    .then(() => {
      return new Error('error!!!');
    })
    .then((res) => {
      console.log('then: ', res);
    })
    .catch((err) => {
      console.log('catch: ', err);
    });
});

// Case 3-7
(function () {
  const promise = Promise.resolve().then(() => {
    return promise;
  });

  promise.catch(console.err);
});

// Case 3-8
// 透传
(function () {
  Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
});

// Case 3-9
(function () {
  Promise.reject('err!!!')
    .then(
      (res) => {
        console.log('success', res);
      },
      (err) => {
        console.log('error', err);
      }
    )
    .catch((err) => {
      console.log('catch', err);
    });
});

// Case 3-10
(function () {
  Promise.resolve()
    .then(
      function success(res) {
        throw new Error('error!!!');
      },
      function fail1(err) {
        console.log('fail1', err);
      }
    )
    .catch(function fail2(err) {
      console.log('fail2', err);
    });
});

// Case 3-11
(function () {
  Promise.resolve('1')
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      console.log('finally');
    });

  Promise.resolve('2')
    .finally(() => {
      console.log('finally2');
      return '我是finally2返回的值';
    })
    .then((res) => {
      console.log('finally2后面的then函数', res);
    });
});

// Case 3-12
(function () {
  Promise.resolve('1')
    .finally(() => {
      console.log('finally1');
      throw new Error('我是finally中抛出的异常');
    })
    .then((res) => {
      console.log('finally后面的then函数', res);
    })
    .catch((err) => {
      console.log('捕获错误', err);
    });
});

// Case 3-13
(function () {
  function promise1() {
    let p = new Promise((resolve) => {
      console.log('promise1');
      resolve('1');
    });

    return p;
  }

  function promise2() {
    return new Promise((resolve, reject) => {
      reject('error');
    });
  }

  promise1()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => console.log('finally1'));

  promise2()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => console.log('finally2'));
});

// Case 3-14 把上边的 finally 替换成 then
(function () {
  function promise1() {
    let p = new Promise((resolve) => {
      console.log('promise1');
      resolve('1');
    });

    return p;
  }

  function promise2() {
    return new Promise((resolve, reject) => {
      reject('error');
    });
  }

  promise1()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .then(() => console.log('finally1'));

  promise2()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .then(() => console.log('finally2'));
});

// Case 4-1
(function () {
  function runAsync(x) {
    const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
    return p;
  }

  Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then((res) =>
    console.log(res)
  );
});

// Case 4-2
(function () {
  function runAsync(x) {
    const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));

    return p;
  }

  function runReject(x) {
    const p = new Promise((res, rej) =>
      setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
    );

    return p;
  }

  Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
    .then((res) => console.log('res', res))
    .catch((err) => console.log('err', err));

  setTimeout(() => {
    Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)]).then(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }, 5000);
});

// Case 4-3
// 可以给异步请求设置超时的时间，如果超过 xx 时间，就可以报错了
(function () {
  function runAsync(x) {
    const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
    return p;
  }

  Promise.race([runAsync(1), runAsync(2), runAsync(3)])
    .then((res) => console.log('result: ', res))
    .catch((err) => console.log(err));
});

// Case 4-4
// Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
// .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
// Promise.all().then()结果中数组的顺序和Promise.all()接收到的数组顺序一致。
// all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。

(function () {
  function runAsync(x) {
    const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
    return p;
  }

  function runReject(x) {
    const p = new Promise((res, rej) =>
      setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
    );
    return p;
  }

  Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
    .then((res) => console.log('result: ', res))
    .catch((err) => console.log('err', err));
});

// Case 5-1
(function () {
  async function async1() {
    console.log('async1 start');
    // await 阻塞后面的代码执行
    await async2();
    console.log('async1 end');
  }

  async function async2() {
    console.log('async2');
  }

  async1();

  console.log('start');
});

// Case 5-2
(function () {
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }

  async function async2() {
    setTimeout(() => {
      console.log('timer');
    }, 0);

    console.log('async2');
  }

  async1();

  console.log('start');
});

// Case 5-3
(function () {
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
    setTimeout(() => {
      console.log('timer1');
    }, 0);
  }

  async function async2() {
    setTimeout(() => {
      console.log('timer2');
    }, 0);
    console.log('async2');
  }

  async1();

  setTimeout(() => {
    console.log('timer3');
  }, 0);

  console.log('start');
});

// Case 5-4
(function () {
  async function async1() {
    console.log('async1 start');
    await new Promise((resolve) => {
      console.log('promise1');
      // resolve 有和没有的区别
      // resolve('promise1');
    });

    console.log('async1 success');
    return 'async1 end';
  }

  console.log('srcipt start');

  async1().then((res) => console.log('then ::', res));

  console.log('srcipt end');
});

// Case 5-5
(function () {
  async function async1() {
    console.log('async1 start');
    await new Promise((resolve) => {
      console.log('promise1');
      resolve('promise1 resolve');
    }).then((res) => console.log(res));

    console.log('async1 success');
    return 'async1 end';
  }

  console.log('srcipt start');

  async1().then((res) => console.log(res));

  console.log('srcipt end');
});

// Case 5-6
(function () {
  async function async1() {
    console.log('async1 start');
    await new Promise((resolve) => {
      console.log('promise1');
      resolve('promise resolve');
    });
    console.log('async1 success');
    return 'async1 end';
  }
  console.log('srcipt start');
  async1().then((res) => {
    console.log(res);
  });
  new Promise((resolve) => {
    console.log('promise2');
    setTimeout(() => {
      console.log('timer');
    });
  });
});

// Case 5-7
(function () {
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }

  async function async2() {
    console.log('async2');
  }

  console.log('script start');

  setTimeout(function () {
    console.log('setTimeout');
  }, 0);

  async1();

  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });
  console.log('script end');
});

// Case 5-8
// 注意 await testSometing 的返回值
(function () {
  async function testSometing() {
    console.log('执行testSometing');
    return 'testSometing';
  }

  async function testAsync() {
    console.log('执行testAsync');
    return Promise.resolve('hello async');
  }

  async function test() {
    console.log('test start...');
    const v1 = await testSometing();
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
  }

  test();

  var promise = new Promise((resolve) => {
    console.log('promise start...');
    resolve('promise');
  });

  promise.then((val) => console.log(val));

  console.log('test end...');
});

// Case 6-1
// 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。
(function () {
  async function async1() {
    await async2();
    console.log('async1');
    return 'async1 success';
  }

  async function async2() {
    return new Promise((resolve, reject) => {
      console.log('async2');
      reject('error');
    });
  }

  async1().then((res) => console.log(res));
});

// Case 6-2
(function () {
  async function async1() {
    try {
      await Promise.reject('error!!!');
    } catch (e) {
      console.log(e);
    }

    console.log('async1');
    return Promise.resolve('async1 success');
  }

  async1().then((res) => console.log(res));

  console.log('script start');
});

// Case 7-1
(function () {
  const first = () =>
    new Promise((resolve, reject) => {
      console.log(3);

      let p = new Promise((resolve, reject) => {
        console.log(7);

        setTimeout(() => {
          console.log(5);
          resolve(6);
          console.log(p);
        }, 0);

        resolve(1);
      });

      resolve(2);

      p.then((arg) => {
        console.log(arg);
      });
    });

  first().then((arg) => {
    console.log(arg);
  });

  console.log(4);
});

// Case 7-2
(function () {
  const async1 = async () => {
    console.log('async1');

    setTimeout(() => {
      console.log('timer1');
    }, 2000);

    await new Promise((resolve) => {
      console.log('promise1');

      // resolve 加上 和 去掉有什么区别
      resolve('promise1 resolve');
    });

    console.log('async1 end');

    return 'async1 success';
  };

  console.log('script start');

  async1().then((res) => console.log(res));

  console.log('script end');

  Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .catch(4)
    .then((res) => console.log(res));

  setTimeout(() => {
    console.log('timer2');
  }, 1000);
});

// Case 7-3
(function () {
  const p1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolve3');
      console.log('timer1');
    }, 0);

    resolve('resovle1');
    resolve('resolve2');
  })
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        console.log(p1);
      }, 1000);

      // 返回 return 会发生什么
      // return 1;
    })
    .finally((res) => {
      console.log('finally', res);
    });
});

/**
 * Case 8-1 使用Promise实现每隔1秒输出1,2,3
 * 思路: 在 Promise 后面叠加 then，每隔 1s 就输出
 */

const case8_1_arr = [1, 2, 3];

// Case 8-1-1 拼接 then
(function () {
  Promise.resolve()
    .then(() => {
      setTimeout(() => {
        console.log('1');
      }, 1000);
    })
    .then(() => {
      setTimeout(() => {
        console.log('2');
      }, 2000);
    })
    .then(() => {
      setTimeout(() => {
        console.log('3');
      }, 3000);
    });
});

// Case 8-1-2 直接用 setTimeout 输出
(function () {
  case8_1_arr.map((x, i) => {
    setTimeout(() => {
      console.log(x);
    }, i * 1000);
  });
});

// Case 8-1-3 使用 Promise,拼接 then 后
(function () {
  case8_1_arr.reduce((p, x) => {
    return p.then(() => {
      return new Promise((r) => {
        setTimeout(() => {
          r(console.log(x));
        }, 1000);
      });
    });
  }, Promise.resolve());
});

// Case 8-1-4 使用 Promise, 拼接 then 后
(function () {
  case8_1_arr.reduce(async (p, x) => {
    await p;

    const result = await new Promise((r) => {
      setTimeout(() => {
        r(console.log(x));
      }, 1000);
    });

    return result;
  }, Promise.resolve());
});

/**
 * Case 8-2 使用Promise实现红绿灯交替重复亮
 * 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？
 */

function red() {
  console.log('red :: ', new Date().getSeconds());
}

function green() {
  console.log('green :: ', new Date().getSeconds());
}

function yellow() {
  console.log('yellow ::', new Date().getSeconds());
}

// Case 8-2-1
(function () {
  let arr = [red, green, yellow];

  console.log('start ::', new Date().getSeconds());

  arr.reduce((p, cb) => {
    return p.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          cb();
          resolve();
        }, (3 - arr.indexOf(cb)) * 1000);
      });
    });
  }, Promise.resolve());
});

// Case 8-2-2 通过 resolve 和 then 来控制

(function () {
  const light = function (timer, cb) {
    return new Promise((resolve) => {
      setTimeout(() => {
        cb();
        resolve();
      }, timer);
    });
  };

  const step = function () {
    console.log('start :: ', new Date().getSeconds());
    Promise.resolve()
      .then(() => {
        return light(3000, red);
      })
      .then(() => {
        return light(2000, green);
      })
      .then(() => {
        return light(1000, yellow);
      });
    // .then(() => {
    //   step();
    // });
  };

  step();
});

/**
 * 实现 MergePromise，相当于 Promise.all
 */

// Case 8-3-1

(function () {
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

  function mergePromise(arr) {
    // 在这里写代码

    return new Promise(async (resolve) => {
      let data = [];
      await arr.reduce((p, x) => {
        return p.then(() => {
          return x().then((res) => {
            data.push(res);
            // return data;
          });
        });
      }, Promise.resolve());

      resolve(data);
    });
  }

  mergePromise([ajax1, ajax2, ajax3]).then((data) => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
  });

  // 要求分别输出
  // 1
  // 2
  // 3
  // done
  // [1, 2, 3]
});

// Case 8-3-2

(function () {
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

  function mergePromise(arr) {
    // 在这里写代码

    const data = [];
    let promise = Promise.resolve();

    arr.forEach((ajax) => {
      promise = promise.then(ajax).then((res) => {
        data.push(res);
        return data;
      });
    });

    return promise;
  }

  mergePromise([ajax1, ajax2, ajax3]).then((data) => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
  });

  // 要求分别输出
  // 1
  // 2
  // 3
  // done
  // [1, 2, 3]
});

/**
 * 8-4 封装一个异步加载图片的方法
 */

// Case 8-4-1
(function () {
  function loadImg(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        console.log('一张图片加载完成');
        resolve(img);
      };
      img.onerror = function () {
        reject(new Error('Could not load image at' + url));
      };
      img.src = url;
    });
  }

  loadImg(
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/28/1708bb0d2846ea40~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp'
  );
});

/**
 * 8-5 限制异步操作的并发个数并尽可能快的完成全部
 */

// Case 8-5
