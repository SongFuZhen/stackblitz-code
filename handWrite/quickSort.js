console.log('Quick Sort');

/**
 * 快速排序算法
 * 1、选定一个 pivot，开始做
 * 2、依次遍历，小于 Pivot 的放在左边，大于的放在右边
 * 3、分别对左右子序，重复执行前两步
 */

function sortArray(nums) {
  quickSort(0, nums.length - 1, nums);

  return nums;
}

function quickSort(start, end, arr) {
  // console.log('arr', arr);

  if (start < end) {
    const mid = sort(start, end, arr);

    // 左子序执行
    arguments.callee(start, mid - 1, arr);

    // 右子序执行
    arguments.callee(mid + 1, end, arr);
  }
}

/**
 * 选定 arr[start] 为 pivot
 * 设置左右下标
 * 左右下标不相同，开始执行
 *   先移动右边的下标，
 * 左右下标相同，排序完成，返回下标
 */
function sort(start, end, arr) {
  const pivot = arr[start];
  let left = start;
  let right = end;

  while (left !== right) {
    while (arr[right] >= pivot && right > left) {
      right--;
    }

    arr[left] = arr[right];

    // console.log('--- right --', arr, left, right);

    while (arr[left] <= pivot && right > left) {
      left++;
    }

    arr[right] = arr[left];

    // console.log('--- left++', arr, left, right);
  }

  arr[left] = pivot;

  return left;
}

const nums = [2, 3, 1, 5, 4];
console.log(sortArray(nums));
