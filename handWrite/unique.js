console.log('Unique');

function es6_unique(arr) {
  return [...new Set(arr)];
}

function unique(arr) {
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
}

const arr = [1, 2, 2, 2, 4, 5];
console.log(unique(arr));
