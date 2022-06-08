console.log('2022-6-8');

// #region 手写斐波那契

function fibonacci(n) {
  let arr = [0, 1];

  let result = arr[n];

  if (typeof result !== 'number') {
    result = fibonacci(n - 1) + fibonacci(n - 2);
    arr[n] = result;
  }

  return result;
}

(function () {
  console.log(fibonacci(10));
})();

// #endregion

// #region 手写快速排序

/**
 * 获取中间的值
 * 大于的放右边，小于的放左边
 * 递归排序
 */

function quickSort(arr) {
  if (arr.length < 1) {
    return arr;
  }

  let left = [];
  let right = [];

  const index = Math.floor(arr.length / 2);
  const idx = arr.splice(index, 1)[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < idx) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  console.log('index', index, arr[index], left, right);

  return quickSort(left).concat(idx, quickSort(right));
}

(function () {
  const arr = [1, 2, 35, 63, 32, 2323, 12, 12];

  console.log(quickSort(arr));
});

// #endregion

// #region 手写冒泡排序

// 两两比较，大的放后面
// 为什么是 arr.length - 1 ？
// 因为比较了 arr[j] 和  arr[j + 1]
function bubbleSort(arr) {
  let frequence = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let done = true;

    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        done = false;
      }

      frequence += 1;
    }

    // 如果没有交换，那么就退出循环
    if (done) {
      break;
    }
  }

  return arr.concat(frequence);
}

(function () {
  const arr = [1, 2, 35, 63, 32, 2323, 12, 12];

  console.log(bubbleSort(arr));
});

// #endregion
