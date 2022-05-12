// 定义没有依赖的模块

define(function () {
  let msg = 'www.google.com';
  function getMsg() {
    return msg.toUpperCase();
  }

  return { getMsg };
});
