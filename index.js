'use strict';
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var path = require('path');
var assert = require('assert');

var FileCache = require('file-cache');

module.exports = function toaStatic(options) {
  options = options || {};
  if (typeof options === 'string') options = {root: options};

  var fileCache = FileCache({
    root: options.root,
    compress: options.compress,
    extraFiles: options.files
  });

  var etag = options.etag !== false;
  var prefix = typeof options.prefix === 'string' ? options.prefix : '/';
  var index = options.index && typeof options.index === 'string' ? options.prefix : 'index.html';
  var maxAge = options.maxAge > 0 ? +options.maxAge : 0;
  var cacheControl = typeof options.cacheControl === 'string' ? options.cacheControl : null;
  var setStatic = options.setStatic;

  return function (callback) {
    var ctx = this;

    if (this.method !== 'HEAD' && this.method !== 'GET') return callback();

    var filePath = safeDecodeURIComponent(this.path);
    var filePath2 = typeof setStatic === 'function' ? setStatic.call(this) : null;

    if (!filePath2 && filePath.indexOf(prefix) !== 0) return callback();

    filePath = filePath2 || filePath;
    if (!path.extname(filePath)) filePath = path.join(filePath, index);
    if (filePath[0] === '/') filePath = filePath.slice(1);

    fileCache(filePath, this.acceptsEncodings())(function (error, file) {
      if (error) throw error;

      ctx.lastModified = file.mtime;
      if (etag) ctx.etag = file.md5;
      if (ctx.fresh) {
        ctx.status = 304;
        return;
      }

      ctx.type = file.type;
      ctx.set('Content-MD5', file.md5);
      ctx.set('Cache-Control', cacheControl || 'max-age=' + maxAge);

      if (ctx.method === 'HEAD') return;
      if (file.compress) ctx.set('Content-Encoding', file.compress);
      ctx.body = file.contents;
    })(callback);
  };
};


function safeDecodeURIComponent(path) {
  try {
    return decodeURIComponent(path);
  } catch (e) {
    return path;
  }
}
