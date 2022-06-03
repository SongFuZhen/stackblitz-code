console.log('数组快速生成 0-100');

const arr_0_100_case_1 = Array.from(new Array(100).keys());
console.log(arr_0_100_case_1);

const arr_0_100_case_2 = Array.from({ length: 100 }, (v, i) => i);
console.log(arr_0_100_case_2);

const arr_0_100_case_3 = Object.keys(Array.apply(null, { length: 100 }));
console.log(arr_0_100_case_3);

const arr_0_100_case_4 = [...Array(100).keys()];
console.log(arr_0_100_case_4);
