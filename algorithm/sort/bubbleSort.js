console.log('冒泡排序');

// 原理: 相邻两元素之间两两比较，比较出大值进行赋值互换，再依次与相邻的元素比较

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }

    console.log(i, arr);
  }

  return arr;
}

let arr = [1, 2, 34, 5, 3, 3, 9, 10];

console.log(bubbleSort(arr));
