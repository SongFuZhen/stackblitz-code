/**
 * 选择一个值，放在一个新的数组里
 * 循环原始数组
 * 新数组从后向前进行对比，如果当前值大于新数组的值，那么就添加在后面
 */
function insertSort(arr) {
  const newArr = [];
  newArr.push(arr[0]);

  for (let i = 0; i < arr.length; i++) {
    for (let j = newArr.length - 1; j >= 0; j--) {
      if (arr[i] > newArr[j]) {
        newArr.splice(j + 1, 0, arr[i]);
        break;
      }

      if (j === 0) {
        newArr.unshift(arr[i]);
      }
    }
  }

  return newArr;
}

(function () {
  console.log('插入排序');

  const arr = [133, 1212, 1222, 122, 3, 423, 12, 12];
  console.log(insertSort(arr));
})();
