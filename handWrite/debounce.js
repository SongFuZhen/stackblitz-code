console.log('---Debounce---');

function debounce(func, timer) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeout);

    // timeout = setTimeout(function () {
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, timer);
  };
}

let count = 1;

const container = document.getElementById('container');

function func() {
  let result = { name: 'tom' };
  console.log('new ', result, new Date().getSeconds());

  container.innerHTML = count++;

  return result;
}

// container.onmousemove = function () {
//   func('tom');
// };

container.onmousemove = debounce(func, 1000);
