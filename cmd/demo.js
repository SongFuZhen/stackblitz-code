define(function (require, exports, module) {
  var data = 'google.com';
  function show() {
    console.log('show :: ', data);
  }

  exports.show = show;
});
