/**
 * 两两对比，大的在后面
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let done = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        done = false;
      }
    }

    if (done) {
      break;
    }
  }

  return arr;
}

(function () {
  console.log('--冒泡排序--');

  const arr = [1212, 123123, 1, 5, 6, 3, 12, 3323, 12313];
  console.log(bubbleSort(arr));
})();
