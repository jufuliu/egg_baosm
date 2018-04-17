'use strict';

const BaseController = require('./base');

class CustomerController extends BaseController {
 
  async index() {
    await this.ctx.render('login.html');
  }
  async login() {
    this.ctx.session.customer = this.ctx.request.body.customerId;
    this.logger.info(`${this.ctx.request.body.customerId} logining`);
    const result = await this.service.utils.callApi({
      url: this.config.svcUrl.customer,
      action: 'CustomerDynamicLogin',
      data:{
        mobile:this.ctx.request.body.customerId,
      },
    });

    this.ctx.body = result.data;
  }
}

module.exports = CustomerController;
