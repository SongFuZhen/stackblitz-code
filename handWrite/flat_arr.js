console.log('flat arr');

function flat_arr(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((p, arr) => {
      return p.concat(Array.isArray(arr) ? flat_arr(arr, depth - 1) : arr);
    }, []);
  }

  // 浅拷贝
  return arr.slice();
}

const arr = [1, [2, 3], [4, 5], [6, 7, [8, 9]]];
console.log(flat_arr(arr, 1));
