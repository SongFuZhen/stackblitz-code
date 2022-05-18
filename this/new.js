// 'use strict';

console.log('-------------- New --------------');

/**
 * 能访问到构造函数里的属性(name)
 * 能访问原型中的属性(eat)
 */

(function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.eat = function () {
    console.log('Eatting');
  };

  var tom = new Person('Tom');
  console.log(tom);

  tom.eat();
});

(function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.eat = function () {
    console.log('Eatting');
  };

  function create() {
    // 1. 获取构造函数，并且删除 arguments 中的第一项
    var Con = [].shift.call(arguments);
    // 2. 创建一个空的对象并链接到构造函数的原型，使它能访问原型中的属性
    var obj = Object.create(Con.prototype);
    // 3. 使用apply改变构造函数中this的指向实现继承，使obj能访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
    // 4. 优先返回构造函数返回的对象
    return ret instanceof Object ? ret : obj;
  }

  var tom = create(Person, 'Tom');
  console.log(tom); // Person{ name: 'tom' }
  tom.eat(); // 'Eatting'
});
