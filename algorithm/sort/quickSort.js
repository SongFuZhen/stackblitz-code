console.log('快速排序');

/**
 * 步骤
 * 1. 取数组的中间值
 * 2. 遍历数组，大于的放数组右边，小于的放在左边
 * 3. 递归并且用 concat 连接
 */
function quickSort(arr) {
  if (arr.length < 1) {
    return arr;
  }

  // 取出中间值
  let num = Math.floor(arr.length / 2);
  let idx = arr.splice(num, 1)[0];

  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < idx) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(idx, quickSort(right));
}

const arr = [1, 32, 4, 5, 23, 22, 12, 13, 65, 77, 01];
console.log(quickSort(arr));
