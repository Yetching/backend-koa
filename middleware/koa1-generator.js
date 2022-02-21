function log(ctx) {
  console.log('generator middleware: ');
  console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function () {
  return function* (next) {
    // 执行中间件
    log(this);

    if (next) {
      yield next;
    }
  };
};
