console.log('数组去重');

// Case 1: 使用 Set
function unique_set(arr) {
  return Array.from(new Set(arr));
}

// Case 2: 使用 filter
function unique_filter(arr) {
  return arr.filter((a, i) => {
    return arr.indexOf(a) === i;
  });
}

// Case 3: 使用 push
function unique_push(arr) {
  let result = [];

  arr.map((a) => {
    if (result.indexOf(a) === -1) {
      result.push(a);
    }
  });

  return result;
}

const testArr = [1, 2, 3, 4, 2, 1, 3, 4, 5, 6, 4, 3, 5, 6, 3];

console.log(unique_set(testArr));
console.log(unique_filter(testArr));
console.log(unique_push(testArr));
