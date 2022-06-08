console.log('插入排序');

/**
 * 拿出一个值，作为初始数组的值，
 * 通过循环想要排序的数组
 * 并和新数组的值从后向前比较
 * 大于就splice到该项后面
 */

function insertSort(arr) {
  // const num = Math.floor(arr.length / 2);
  // const newArr = arr.splice(num, 1);
  // for (let i = 0; i < arr.length; i++) {
  //   for (let j = newArr.length - 1; j <= 0; j--) {
  //     if (arr[i] > newArr[j]) {
  //       newArr.splice(j, 1, arr[i]);
  //     }
  //   }
  // }
  // return newArr;

  return arr;
}

const arr = [1, 2, 4, 6, 6, 712, 1212, 312, 22, 3, 45];
console.log(insertSort(arr));
