const Koa = require('koa');
const app = new Koa();

// 使用middleware
// koa2中使用generator中间件
const convert = require('koa-convert');

const generatorLogger = require('./middleware/koa1-generator');

// koa2使用async中间件
const asyncLogger = require('./middleware/koa2-async');
const route = require('./middleware/route');

app.use(asyncLogger());

app.use(convert(generatorLogger()));

app.use(route());

// app.use(async (ctx) => {
//   ctx.body = 'hello koa2, nodemon';
// });

app.listen(3000);

console.log('koa is starting at port 3000');
