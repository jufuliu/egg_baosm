'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.logger = {
    dir: 'C://Users/liujufu/Documents/log',
  };

  config.svcUrl={
    baseData:'http://172.17.83.50:10001/Services/api',
    order:'http://ordersvc.91vfeng.com/Services/api',
    customer:'http://customersvc.91vfeng.com/Services/api',
    product:'http://productsvc.91vfeng.com/Services/api',
  }
  return config;
};
