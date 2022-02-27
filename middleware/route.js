const fs = require('fs');
const path = require('path');

async function route(ctx) {
  let viewPath = path.resolve(__dirname, '../views/404.html');
  switch (ctx.request.url) {
    case '/':
    case '/index':
      viewPath = path.resolve(__dirname, '../index.html');
      break;
    case '/blog':
      viewPath = path.resolve(__dirname, '../views', 'blog.html');
      break;
    default:
      break;
  }
  const html = await renderHtml(viewPath);

  ctx.response.body = html;
}

function renderHtml(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'binary', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = function () {
  return async function (ctx, next) {
    await route(ctx);
    await next();
  };
};
