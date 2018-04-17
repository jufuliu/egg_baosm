'use strict';

const BaseController = require('./base');

class OrderController extends BaseController {
    async index() {
        await this.ctx.render('order.html');
    }
    async xhr() {
        await this.ctx.render('xhr.html');
    }
    async getOrder() {
        // const isLogin = this.checkLogin();
        await this.ctx.render('order.html');
    }
    async getOrderList() {
        // const isLogin = this.checkLogin();
        await this.ctx.render('order.html');
    }
}

module.exports = OrderController;