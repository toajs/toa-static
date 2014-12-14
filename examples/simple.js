'use strict';
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var Toa = require('toa');
var toaStatic = require('../index')('examples/static');

Toa(function (Thunk) {
  return Thunk.call(this, toaStatic);
}).listen(3000);
