'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521013027113_161';

  // add your config here
  config.middleware = [ 'auth','errorHandler' ];
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.logger = {
    dir: 'C://Users/liujufu/Documents/log',
  };

  config.svcUrl={
    baseData:'http://basedatasvc.91vfeng.com/Services/api',
    order:'http://ordersvc.91vfeng.com/Services/api',
    customer:'http://customersvc.91vfeng.com/Services/api',
    product:'http://productsvc.91vfeng.com/Services/api',
  }

  return config;
};
