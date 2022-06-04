console.log('斐波那契数列');

// 原理：Arr[n] = Arr[n-1] + Arr[n-2]
// 当前项 = 当前项的 前面两位数之和
// 初始两位数 0, 1

// Case 1: 实现

function fibonacci_while(n) {
  if (n <= 1) {
    return n;
  }

  let arr = [0, 1];
  let i = n + 1 - 2;

  while (i > 0) {
    let a = arr[arr.length - 2];
    let b = arr[arr.length - 1];
    arr.push(a + b);
    i--;
  }

  return arr[arr.length - 1];
}

// Case 2: 递归
function fibonacci(n) {
  function fn(n, cur = 0, next = 1) {
    if (n === 0) {
      return cur;
    } else {
      return fn(n - 1, next, cur + next);
    }
  }

  return fn(n);
}

// Case3: 迭代，这个算100 都算不出来

let i = 1;
function fibonacci_s(n) {
  if (n <= 1) {
    return n;
  }

  // console.log('n===', n, i++);

  return fibonacci_s(n - 1) + fibonacci_s(n - 2);
}

[...new Array(11).keys()].map((d) => {
  console.log(
    d,
    fibonacci_s(d),
    fibonacci_s(d) === fibonacci_while(d),
    fibonacci_s(d) === fibonacci(d)
  );
});

// console.log('xxxx', fibonacci_while(100));

// Case 4: 使用 闭包缓存起来

function fibonacci_closure(n) {
  let memoArr = [0, 1];

  function fib(n) {
    let result = memoArr[n];

    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memoArr[n] = result;
    }

    return result;
  }

  return fib(n);
}

// 1476 最大了？其他为什么是 null
console.log('dd', fibonacci_closure(13));

// Case5 : 使用 数学公式
function fibonacci_math(n) {
  if (n < 2) {
    return n;
  }

  const sqrt5 = Math.sqrt(5);

  return (
    ((Math.pow((1 + sqrt5) / 2, n) - Math.pow((1 - sqrt5) / 2, n)) / sqrt5) %
    1000000007
  );
}

// 1474 最大了？其他为什么是 null
console.log('xxx', fibonacci_math(4));
console.log('xxx', fibonacci_math(1474));
