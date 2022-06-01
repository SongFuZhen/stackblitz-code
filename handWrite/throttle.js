console.log('Throttle');

// 使用时间戳 进行执行，有头没尾
function throttle(func, timer) {
  let context;
  let args;
  let previous = 0;

  return function () {
    let now = new Date();
    context = this;
    args = arguments;

    if (now - previous > timer) {
      func.apply(context, args);
      previous = now;
    }
  };
}

let count = 1;
const container = document.getElementById('throttle');

function func() {
  console.log('count', count, new Date().getSeconds());
  container.innerHTML = count++;
}

// container.onmousemove = throttle(func, 5000);

// 使用定时器 进行执行，没头有尾
function throttle_timeout(func, timer) {
  let timeout, context, args;

  return function () {
    context = this;
    args = arguments;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, timer);
    }
  };
}

// container.onmousemove = throttle_timeout(func, 5000);

// 有头有尾的执行
function throttle_all(func, timer, options = {}) {
  let timeout, context, args;
  let previous = 0;

  const later = function () {
    previous = options.leading ? +new Date() : 0;
    timeout = undefined;
    func.apply(context, args);

    if (!timeout) {
      context = args = null;
    }
  };

  const throttle = function () {
    context = this;
    args = arguments;

    const now = +new Date();

    // 无头
    if (!previous && !options.leading) {
      previous = now;
    }

    const remaining = timer - (now - previous);

    if (remaining <= 0 || remaining > timer) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      previous = now;
      func.apply(context, args);

      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing) {
      // 有尾
      timeout = setTimeout(later, remaining);
    }
  };

  throttle.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = undefined;
  };

  return throttle;
}

container.onmousemove = throttle_all(func, 2000, {
  leading: true,
  trailing: false,
});
