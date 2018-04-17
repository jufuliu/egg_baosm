'use strict';

module.exports = options => {
  return async function weixinHandler(ctx, next) {

    if (!ctx.cookie.code) {
      await next();
      return;
    }

    const needLogin = checkNeedLogin(ctx);
    const customer = ctx.session.customer;
    if (!customer && needLogin) {
      ctx.body = {
        result: 0,
        msg: '没有登录',
      };
    } else {
      await next();
    }

  };
};
