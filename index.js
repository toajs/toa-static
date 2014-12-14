'use strict';
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var path = require('path');
var Thunk = require('thunks')();
var FileCache = require('file-cache');

module.exports = function (options) {
  options = options || {};
  if (typeof options === 'string') options = {root: options};

  var fileCache = FileCache({
    root: options.root,
    compress: options.compress,
    extraFiles: options.files
  });

  var etag = options.etag !== false;
  var fileMap = options.fileMap || {};
  var prefix = typeof options.prefix === 'string' ? options.prefix : '/';
  var index = options.index === false ? false : (options.index || 'index.html');
  var maxAge = options.maxAge >= 0 ? Math.ceil(options.maxAge / 1000) : 24 * 60 * 60 * 30;
  var cacheControl = typeof options.cacheControl === 'string' ? options.cacheControl : null;
  var staticPath = options.staticPath || options.setStatic;
  if (typeof staticPath !== 'function') staticPath = null;

  return function toaStatic(callback) {

    return Thunk.call(this)(function() {
      var ctx = this;

      if (this.method !== 'HEAD' && this.method !== 'GET') return;

      var filePath = safeDecodeURIComponent(this.path);
      if (fileMap[filePath]) filePath = fileMap[filePath];
      var filePath2 = staticPath ? staticPath.call(this) : null;

      if (!filePath2 && !fileMap[filePath] && filePath.indexOf(prefix) !== 0) return;

      filePath = filePath2 || filePath;
      if (index && !path.extname(filePath)) filePath = path.join(filePath, index);
      if (filePath[0] === '/') filePath = filePath.slice(1);

      return fileCache(filePath, this.acceptsEncodings())(function (error, file) {
        if (error) throw error;

        ctx.status = 200;
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
      });
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
