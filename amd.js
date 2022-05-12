// AMD模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系。
// AMD模式可以用于浏览器环境，并且允许非同步加载模块，也可以根据需要动态加载模块。

(function () {
  require.config({
    baseUrl: '', // 基本路径，出发点在根目录下
    paths: {
      //映射: 模块标识名: 路径
      demo: './amd/demo',
    },
  });

  require(['demo'], function (demo) {
    const msg = demo.getMsg();
    console.log('msg :: ', msg);
  });
})();
