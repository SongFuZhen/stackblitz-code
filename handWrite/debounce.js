console.log('---Debounce---');

// 简单版本的
function easyDebounce(func, time) {
  let timer;

  return function () {
    let context = this; // 保存this指向
    let args = arguments; // 拿到event对象

    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(context, args);
    }, time);
  };
}

function debounce(func, timer, immediate) {
  let timeout;

  const debounced = function () {
    const context = this;
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate) {
      const callNow = !timeout;

      timeout = setTimeout(function () {
        console.log('timeout === null');
        timeout = null;
      }, timer);

      if (callNow) {
        console.log('call now');
        return func.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        console.log('apply');
        func.apply(context, args);
      }, timer);
    }
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

let count = 1;

const container = document.getElementById('debounce');

function func() {
  let result = { name: 'tom' };
  console.log('new ', result, new Date().getSeconds());

  container.innerHTML = count++;

  return result;
}

// container.onmousemove = function () {
//   func('tom');
// };

const setCount = debounce(func, 10000);

container.onmousemove = setCount;

// setTimeout(() => {
//   console.log('cancel');
//   setCount.cancel();
// }, 3000);
