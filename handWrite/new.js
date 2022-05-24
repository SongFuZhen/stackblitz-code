/**
 * 手写一个 new 的实现
 */

(function () {
  function my_new() {
    console.log('ar', arguments);
    // 1、获取构造函数，并且删除 arguments 中的第一项
    var Con = Array.prototype.shift.call(arguments);

    // 2、创建一个空的对象并链接到构造函数的原型，使它能够访问原型中的属性
    var obj = Object.create(Con.prototype);

    // 3、使用 apply 改变构造函数中 this 的指向，实现继承，使 obj 能够访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);

    console.log('ret', arguments, ret);

    // 4、优先返回构造函数返回的对象
    return ret instanceof Object ? ret : obj;
  }

  function Person(name) {
    this.name = name;
  }

  Person.prototype.eat = function () {
    console.log('Eatting');
  };

  var tom = my_new(Person, 'Tom');
  console.log(tom); // Person{ name: 'Tom' }
  tom.eat(); // 'Eatting'
});
