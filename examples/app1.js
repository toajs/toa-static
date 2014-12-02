'use strict';
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var Toa = require('toa');
var toaStatic = require('../index')({
  root: 'examples/static',
  maxAge: 1000 * 60 * 60
});

Toa(function (Thunk) {
  return toaStatic(this);
}).listen(3000);
