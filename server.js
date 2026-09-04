const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json' };
http.createServer((req, res) => {
  const pathname = decodeURIComponent(req.url.split('?')[0]);
  const file = pathname === '/' ? '/index.html' : pathname;
  const safe = path.normalize(path.join(root, file));
  if (!safe.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(safe, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(safe)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(port, '0.0.0.0', () => console.log(`Pocket Blocks listening on ${port}`));
