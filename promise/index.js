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

//
