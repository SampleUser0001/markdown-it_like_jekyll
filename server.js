const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
app.use(serveStatic(path.join(__dirname, '_site/content')));

const port = 3000;
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});