const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', 1);
    res.write('helloworld');
  }
});

server.listen(19999, () => {
  console.log('成功启动');
});
