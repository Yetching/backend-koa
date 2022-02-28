function log(ctx) {
  console.log('------');
  console.log('async-middleware');
  // console.log(ctx);
  console.log(ctx.request.method, ctx.request.header.host + ctx.request.url);
}

module.exports = function () {
  return async function (ctx, next) {
    log(ctx);
    await next();
  };
};
