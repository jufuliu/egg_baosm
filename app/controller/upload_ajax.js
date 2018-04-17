'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');

class UploadAjaxController extends Controller {
  async show() {
    await this.ctx.render('page/ajax.html');
  }

  async upload2() {
    const stream = await this.ctx.getFileStream();
    console.log(stream);
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    console.log(filename + ' --- ' + stream.filename);
    const target = path.join(this.config.baseDir, 'app/public', stream.filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    this.ctx.body = {
      url: '/public/' + stream.filename
    };
  }
  async upload() {
    const stream = await this.ctx.getFileStream();
    let buf;
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    console.log(stream);
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', stream.filename);
    await fs.writeFile(target, buf);


    this.ctx.body = '/public/' + stream.filename;
    console.log('resp', this.ctx.response);
  }

  async multipartUpload() {
    const parts = this.ctx.multipart({
      autoFields: true
    });
    const files = [];

    let stream;
    while ((stream = await parts()) != null) {
      const filename = stream.filename.toLowerCase();
      const target = path.join(this.config.baseDir, 'app/public', filename);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      files.push(filename);
    }
  }

}

module.exports = UploadAjaxController;