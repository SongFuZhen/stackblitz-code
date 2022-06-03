console.log('数组扁平化');

const arr = [1, 2, [3, 4], [5, 6, [7, 8, [9, 10]]]];

// Case 1 flat
const arr_flat_case_0 = arr.flat(3);
console.log(arr_flat_case_0);

// Case 2 prototype.flat
const arr_flat_case_1 = Array.prototype.flat.call(arr, 3);
console.log(arr_flat_case_1);

// Case 3 自定义 flat 函数
function my_flat(arr, depth = 1) {
  // const selfFunc = arguments.callee;
  if (depth > 0) {
    return arr.reduce((p, a) => {
      return p.concat(Array.isArray(a) ? my_flat(a, depth - 1) : a);
    }, []);
  }

  return arr;
}

const arr_flat_case_2 = my_flat(arr, 3);
console.log(arr_flat_case_2);

// Case 4 通过 String
const arr_flat_case_3 = arr
  .toString()
  .split(',')
  .map((d) => parseFloat(d));
console.log(arr_flat_case_3);

// Case 5 正则表达式
const arr_flat_case_4 = JSON.stringify(arr)
  .replace(/(\[|\])/g, '')
  .split(',')
  .map((d) => parseFloat(d));
console.log(arr_flat_case_4);

// Case 6 Array.some
const arr_flat_case_5 = function (array) {
  while (array.some((item) => Array.isArray(item))) {
    array = [].concat(...array);
  }

  return array;
};

console.log(arr_flat_case_5(arr));
