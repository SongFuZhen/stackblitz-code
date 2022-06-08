console.log('计算字符串中出现最多的字符和其出现次数');

function frequence(str) {
  var obj = {};

  for (let x = 0; x < str.length; x++) {
    var itm = str.charAt(x);
    
    if (obj[itm]) {
      obj[itm]++;
    } else {
      obj[itm] = 1;
    }
  }

  return obj;

  const arr = str.split('');
  const setArr = [...new Set(arr)];
  // let map = {};
  // let maxLen = 1;
  // let maxStr = setArr[0];

  // setArr.map((s) => {
  //   const len = arr.filter((a) => a === s).length;
  //   map[s] = len;

  //   if (len > maxLen) {
  //     maxLen = len;
  //     maxStr = s;
  //   }
  // });

  let maxLen = 1;
  let maxStr = str[0];

  for (let i = 0; i < setArr.length; i++) {
    let fre = 0;

    for (let j = 0; j < arr.length; j++) {
      if (setArr[i] === arr[j]) {
        fre += 1;
      }
    }

    if (maxLen < fre) {
      maxLen = fre;
      maxStr = setArr[i];
    }
  }

  return `${maxStr}: ${maxLen}`;
}

const str = 'asdfewrsadfadsfddqwegdsagflkoidfsg';
console.log(frequence(str));
