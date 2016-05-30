'use strict'
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var path = require('path')
var FileCache = require('file-cache')

module.exports = function (options) {
  options = options || {}
  if (typeof options === 'string') options = {root: options}

  var etag = options.etag !== false
  var fileMap = options.fileMap || {}
  var prefix = typeof options.prefix === 'string' ? options.prefix : '/'
  var prunePrefix = !!options.prunePrefix
  var index = options.index === false ? false : (options.index || 'index.html')
  var maxAge = options.maxAge >= 0 ? Math.ceil(options.maxAge / 1000) : 24 * 60 * 60 * 30
  var cacheControl = typeof options.cacheControl === 'string' ? options.cacheControl : null
  var staticPath = options.staticPath || options.setStatic
  if (typeof staticPath !== 'function') staticPath = null

  var fileCache = FileCache({
    root: options.root,
    extraFiles: options.files,
    compress: options.compress,
    maxCacheLength: options.maxCacheLength
  })

  return function toaStatic (callback) {
    var method = this.method
    if (method !== 'HEAD' && method !== 'GET') return callback()

    var filePath = safeDecodeURIComponent(this.path)
    if (filePath.indexOf(prefix) !== 0) return callback()
    if (prunePrefix) filePath = filePath.replace(prefix, '')

    if (fileMap[filePath]) filePath = fileMap[filePath]
    var filePath2 = staticPath ? staticPath.call(this) : null

    filePath = filePath2 || filePath
    if (!filePath) return callback()
    if (index && !path.extname(filePath)) filePath = path.join(filePath, index)
    if (filePath[0] === '/') filePath = filePath.slice(1)

    var ctx = this
    return fileCache(filePath, this.acceptsEncodings())(function (error, file) {
      if (error) ctx.throw(404)

      ctx.status = 200
      ctx.lastModified = file.mtime
      if (etag) ctx.etag = file.md5
      if (ctx.fresh) {
        ctx.status = 304
        return ctx.end()
      }

      ctx.type = file.type
      ctx.set('Content-MD5', file.md5)
      ctx.set('Cache-Control', cacheControl || 'max-age=' + maxAge)

      if (method === 'HEAD') return ctx.end()
      if (file.compress) ctx.set('Content-Encoding', file.compress)
      ctx.body = file.contents
      ctx.end()
    })(callback)
  }
}

function safeDecodeURIComponent (path) {
  try {
    return decodeURIComponent(path)
  } catch (e) {
    return path
  }
}
