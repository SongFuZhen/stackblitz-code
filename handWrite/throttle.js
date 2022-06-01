console.log('Throttle');

// 使用时间戳 进行执行
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

// 使用定时器 进行执行
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
function throttle_all(func, timer) {
  let timeout, context, args;
  let previous = 0;

  const later = function () {
    previous = +new Date();
    timeout = null;
    func.apply(context, args);
  };

  const throttle = function () {
    const now = +new Date();
    const remaining = timer - (now - previous);

    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > timer) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };

  return throttle;
}

container.onmousemove = throttle_all(func, 5000);
