'use strict';

const Controller = require('egg').Controller;

class BasedataController extends Controller {
  async getProvinces() {
    const result = await this.service.utils.callApi({
      url: this.config.svcUrl.baseData,
      action: 'provincelist',
    });
    this.ctx.body = result.data;
  }
}

module.exports = BasedataController;
