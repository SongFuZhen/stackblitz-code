var origin_arr = [1, 2, 3, 4, { name: 'tom' }];

console.log('origin_arr :: ', origin_arr);

// 浅拷贝

// Object.assign
var copy_arr_1 = Object.assign([], origin_arr);
copy_arr_1[1] = 3;
console.log(
  '修改 2 - 3 copy_arr_1 ::',
  copy_arr_1,
  ', origin_arr ::',
  origin_arr
);

// concat
var copy_arr_2 = origin_arr.concat([5]);
copy_arr_2[4].name = 'jerry';

console.log(
  '添加 5, 修改 tom -> jerry  copy_arr_2 :: ',
  copy_arr_2,
  ', origin_arr :: ',
  origin_arr
);

// 扩展运算符
var copy_arr_3 = [...origin_arr];

copy_arr_3[4].name = 'tom_again';

console.log('copy_arr_3 ::', copy_arr_3, ', origin_arr ::', origin_arr);

// slice
var copy_arr_4 = origin_arr.slice();
copy_arr_4[4].name = 'jerry_again';
console.log('copy_arr_4 :: ', copy_arr_4, ', origin_arr :: ', origin_arr);

// 使用 lodash.clone

import lodash from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';

var copy_arr_5 = lodash.clone(origin_arr);
copy_arr_5[4].name = 'tom_reset';

console.log('copy_arr_5 :: ', copy_arr_5, ', origin_arr ::', origin_arr);

// 深拷贝
