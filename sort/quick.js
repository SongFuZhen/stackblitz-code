/**
 * 选择一个中间的值
 * 然后循环判断，将大于这个的值放在右边，小于的放到左边
 * 然后递归左边和右边
 */
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const num = Math.floor(arr.length / 2);
  const idx = arr.splice(num, 1)[0];

  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < idx) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(idx, quickSort(right));
}

(function () {
  console.log('快速排序');
  const arr = [333, 12, 112, 1, 2, 363, 323, 66];
  console.log(quickSort(arr));
});
