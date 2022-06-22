console.log('复制链表');

var obj = {
  val: 1,
  random: {
    val: 4,
    random: {
      val: 1,
      next: null,
    },
    next: null,
  },
  next: {
    val: 2,
    random: {
      val: 3,
      next: null,
    },
    next: {
      val: 3,
      random: {
        val: 4,
        next: null,
      },
      next: {
        val: 4,
        random: {
          val: 1,
          next: null,
          random: {
            val: 1,
            next: null,
          },
        },
        next: null,
      },
    },
  },
};

function copyLink(head, map = new Map()) {
  if (!head) {
    return null;
  }

  if (!map.has(head)) {
    map.set(head, { val: head.val });

    Object.assign(map.get(head), {
      next: copyLink(head.next, map),
      random: copyLink(head.random, map),
    });
  }

  return map.get(head);
}

console.log(copyLink(obj));
