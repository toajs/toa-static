'use strict';
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var Toa = require('toa');
var toaStatic = require('../index')({
  root: 'examples/static',
  maxAge: 1000 * 60 * 60
});

var app = Toa();
app.use(toaStatic);
app.listen(3000);
