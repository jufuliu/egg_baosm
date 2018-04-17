'use strict';
const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');

// 处理成功响应
exports.success = ({
  ctx,
  res = null,
  msg = '请求成功',
}) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = 200;
};

exports.inarray = (arr, obj) => {
  if (!obj) {
    return false;
  }
  let i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
};

exports.parseQueryString = url => {
  // url = url == null ? window.location.href : url;
  if (!url) return null;
  let search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
  if (search === '') return {};
  search = search.split('&');
  const query = {};
  for (let i = 0; i < search.length; i++) {
    const pair = search[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

exports.isAjaxRequest = ctx => {
  if (ctx.request.header['x-requested-with'] === 'XMLHttpRequest') {
    return true;
  }
  return false;
};
