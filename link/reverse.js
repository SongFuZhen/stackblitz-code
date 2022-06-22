console.log('反转链表');

var obj = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: null,
      },
    },
  },
};

function reverseLink(head) {
  let cur = head;
  let pre = null;

  while (cur !== null) {
    next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  return pre;
}

console.log(reverseLink(obj));
