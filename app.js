const Koa = require('koa');
const app = new Koa();
const path = require('path');

// 使用middleware
// koa2中使用generator中间件
const convert = require('koa-convert');

const generatorLogger = require('./middleware/koa1-generator');

// koa2使用async中间件
const asyncLogger = require('./middleware/koa2-async');
const route = require('./middleware/route');

// 路由
const router = require('./router/index');

// body parser
const bodyparser = require('koa-bodyparser');

const static = require('koa-static');

app.use(bodyparser());

app.use(asyncLogger());

app.use(convert(generatorLogger()));

app.use(route());

app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx) => {
//   ctx.body = 'hello koa2, nodemon';
// });

app.use(static(path.join(__dirname, './static')));

app.listen(3000);

console.log('koa is starting at port 3000');
