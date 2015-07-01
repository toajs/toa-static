'use strict'
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var Toa = require('toa')
var toaStatic = require('../index')('examples/static')

Toa(function () {
  return toaStatic
}).listen(3000)
