const Router = require('koa-router');

let page1 = new Router();

page1.get('/hello', async (ctx) => {
  let html = `
  <ul>
    <li><a href="/page2/helloworld">/page/helloworld</a></li>
    <li><a href="/page2/404">/page/404</a></li>
  </ul>
`;
  ctx.body = html;
});

let page2 = new Router();
page2
  .get('/404', async (ctx) => {
    ctx.body = '404 page!';
  })
  .get('/helloworld', async (ctx) => {
    ctx.body = {
      url: ctx.url,
      req_query: ctx.request.query,
      req_querystring: ctx.request.querystring,
      ctx_query: ctx.query,
      ctx_querystring: ctx.querystring,
    };
  })
  .post('/helloworld', async (ctx) => {
    let postData = await parsePostData(ctx);
    ctx.body = postData;
  });

let router = new Router();
router.use('/page1', page1.routes(), page1.allowedMethods());
router.use('/page2', page2.routes(), page2.allowedMethods());

// 加载路由中间件

// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = '';
      ctx.req.addListener('data', (data) => {
        postdata += data;
      });
      ctx.req.addListener('end', function () {
        let parseData = parseQueryStr(postdata);
        resolve(parseData);
      });
    } catch (err) {
      reject(err);
    }
  });
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
  // form-data
  console.log(queryStr);

  // json
  // console.log(JSON.parse(queryStr));

  // TODO content-type 不一样 处理方式也不一样 怎么综合处理
  let queryData = {};
  let queryStrList = queryStr.split('&');
  console.log(queryStrList);
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData;
}

module.exports = router;
