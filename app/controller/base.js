'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async checkLogin() {

    const customerId = this.ctx.session.customerId;

    if (!customerId) {
      this.ctx.body = {
        result: 0,
        msg: 'not login',
      };
    } else {
      this.ctx.body = {
        result: 1,
        msg: '已登录',
      };
    }
  }
}

module.exports = BaseController;