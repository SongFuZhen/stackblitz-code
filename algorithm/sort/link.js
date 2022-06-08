console.log('单链表反转');

let obj = {
  a: 1,
  next: {
    a: 2,
    next: {
      a: 3,
      next: {
        a: 4,
        next: null,
      },
    },
  },
};

const result = {
  a: 4,
  next: {
    a: 3,
    next: {
      a: 2,
      next: {
        a: 1,
        next: null,
      },
    },
  },
};

// function reverseObj(obj) {
//   let list = obj;

//   let cur = obj;
//   let pre = null;

//   if (cur === null) {
//     return null;
//   }

//   while (cur.next !== null) {
//     pre = cur.next;
//     cur.next = pre.next;
//     pre.next = list;
//     list = pre;
//   }

//   return list;
// }

function reverseObj(obj) {
  let pre = null;
  let cur = obj;

  while (cur !== null) {
    let temp = cur.next; // 拿到 next，保存起来

    cur.next = pre; // 将 pre 赋值给 cur.next
    pre = cur; // 将 cur 赋值给 pre

    cur = temp; // 设置 cur，继续循环
  }

  return pre;
}

console.log(reverseObj(obj));
