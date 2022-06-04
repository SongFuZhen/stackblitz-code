console.log('斐波那契数列');

// 原理：Arr[n] = Arr[n-1] + Arr[n-2]
// 当前项 = 当前项的 前面两位数之和
// 初始两位数 1, 1

// Case 1: 实现

function fibonacci_while(n) {
  if (n <= 1) {
    return 1;
  }

  let arr = [1, 1];
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
  function fn(n, cur = 1, next = 1) {
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
    return 1;
  }

  // console.log('n===', n, i++);

  return fibonacci_s(n - 1) + fibonacci_s(n - 2);
}

[...new Array(10).keys()].map((d) => {
  console.log(
    d,
    fibonacci_s(d) === fibonacci_while(d),
    fibonacci_s(d) === fibonacci(d)
  );
});

console.log('xxxx', fibonacci_while(100));
