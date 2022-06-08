console.log('插入排序');

/**
 * 拿出一个值，作为初始数组的值，
 * 通过循环想要排序的数组
 * 并和新数组的值从后向前比较
 * 大于就splice到该项后面
 * 如果 到 0 还没有比新数组大到，那么就添加在头部
 */

function insertSort(arr) {
  let newArr = [];
  newArr.push(arr[0]);

  for (let i = 0; i < arr.length; i++) {
    for (let j = newArr.length - 1; j >= 0; j--) {
      if (arr[i] > newArr[j]) {
        newArr.splice(j + 1, 0, arr[i]);
        break;
      }

      // 重点
      if (j === 0) {
        newArr.unshift(arr[i]);
      }
    }
  }

  return newArr;
}

const arr = [1, 2, 4, 6, 6, 712, 1212, 312, 22, 3, 45];
console.log(insertSort(arr));
