'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/order', controller.order.index);
  router.get('/xhr', controller.order.xhr);
  router.post('/upload', controller.uploadAjax.upload);
  router.get('/customer/login', controller.customer.index);
  router.post('/customer/login', controller.customer.login);
  router.post('/basedata/getprovinces', controller.basedata.getProvinces);
  router.get('/', controller.home.index);
};
