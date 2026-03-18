// Static file server for Azure App Service (Linux/Node 20-lts)
// Serves the Vite-built SPA with SPA routing fallback to index.html
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const MIME = {
  '.html':  'text/html',
  '.js':    'application/javascript',
  '.mjs':   'application/javascript',
  '.css':   'text/css',
  '.json':  'application/json',
  '.svg':   'image/svg+xml',
  '.png':   'image/png',
  '.jpg':   'image/jpeg',
  '.jpeg':  'image/jpeg',
  '.ico':   'image/x-icon',
  '.woff':  'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':   'font/ttf',
  '.md':    'text/markdown'
};

http.createServer(function (req, res) {
  var url = req.url.split('?')[0];
  var fp  = path.join(ROOT, url === '/' ? 'index.html' : url);

  // SPA fallback: serve index.html for unknown routes
  if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
    fp = path.join(ROOT, 'index.html');
  }

  var ext = path.extname(fp);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
  fs.createReadStream(fp).pipe(res);

}).listen(PORT, function () {
  console.log('Earth Copilot frontend listening on port ' + PORT);
});
