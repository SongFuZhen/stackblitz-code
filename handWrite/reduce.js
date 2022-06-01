console.log('Reduce');

Array.prototype.my_reduce = function (reducer, initValue) {
  const arr = this; // this就是调用reduce方法的数组
  let total = initValue || arr[0]; // 默认为数组的第一项

  console.log(total);

  // 有初始值的话从0遍历，否则从1遍历
  for (let i = initValue ? 0 : 1; i < arr.length; i++) {
    total = reducer(total, arr[i], i, arr);
  }

  return total;
};

const arr = [1, 2, 3, 4];

const sumArr = arr.my_reduce((p, c, i, array) => {
  return p + c;
}, 0);

console.log('sumArr', sumArr);
