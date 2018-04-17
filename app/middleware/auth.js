'use strict';

function checkNeedLogin(ctx) {

  let channel = ctx.query.channel;
  if (!channel) {

    const query = ctx.helper.parseQueryString(ctx.header.referer);

    if (query && query.code && ctx.helper.isAjaxRequest(ctx)) {
      console.log('code', query.code);
      ctx.session.channel = null;
    } else {
      channel = ctx.session.channel;
    }
  } else {
    ctx.session.channel = channel;
  }

  const notNeedLoginChannel = ['1085107', '1087657'];

  if (!ctx.helper.isAjaxRequest(ctx)) {
    return false;
  }
  if (ctx.url.indexOf('login') !== -1) {
    return false;
  }
  if (ctx.helper.inarray(notNeedLoginChannel, channel)) {
    return false;
  }
  if (ctx.url.indexOf('order') !== -1) {
    if (ctx.query.idcard !== 0) {
      return false;
    }
  }

  return true;
}

module.exports = options => {
  return async function auth(ctx, next) {

    // if (!options.enabled) {
    //   await next();
    //   return;
    // }

    const needLogin = checkNeedLogin(ctx);
    const customer = ctx.session.customer;
    if (!customer && needLogin) {
      ctx.body = {
        result: 63,
        notice: '没有登录',
      };
    } else {
      await next();
    }

  };
};