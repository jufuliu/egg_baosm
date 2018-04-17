'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async callApi(param) {
    param.data=param.data || {}
    const request = {
      partnercode: '889930221',
      version: '1.0',
      source: '2',
      reqhash: 'rtt43',
      action: param.action,
      req: JSON.stringify(param.data)||'',
    };
    this.logger.info(param.url, param.action, request.req);
    const result = await this.ctx.curl(param.url, {
      method: 'POST',
      data: request,
      dataType: 'json',
    });
    this.logger.info(result.data);
    return result;
  }
}

module.exports = UserService;
