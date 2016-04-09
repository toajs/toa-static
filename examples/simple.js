'use strict'
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var Toa = require('toa')
var Router = require('toa-router')
var toaStatic = require('toa-static')

var router = new Router()
  .get('/', function () {
    this.body = 'Hello'
  })
  .get('/(*)', function () {
    this.body = this.method + ' ' + this.path
  })

var staticFn = toaStatic({
  root: 'examples/static',
  prefix: '/static'
})

var app = Toa(function *() {
  yield staticFn
  yield router
})

app.listen(3000)
