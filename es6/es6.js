import { basicNum, add } from './demo';

function test(ele) {
  ele.textContent = add(99 + basicNum);
}

export default test;
