const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const [fileName] = process.argv.slice(2);

gZipFn(fileName);

function gZipFn(fileName) {
  console.log('gz', fileName);
  const sourcePath = path.resolve(__dirname, fileName);
  // 输出的文件名，gz后缀
  const gzipPath = `${sourcePath}.gz`;

  const gzip = zlib.createGzip();
  // 读原文件 xx.min.js
  const rs = fs.createReadStream(sourcePath);
  // 写入后缀 gz 结尾的新文件
  const ws = fs.createWriteStream(gzipPath);

  rs.on('err', function (err) {
    console.log('gzip run err >>>', err);
  });
  // 使用 gzip 压缩文件
  rs.pipe(gzip).pipe(ws);
}
