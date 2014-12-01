'use strict';
// **Github:** https://github.com/toajs/toa-static
//
// **License:** MIT

var Toa = require('toa');
var toaStatic = require('../index');
var app = Toa(function (Thunk) {
  this.body = this.body || 'Hello World!\n-- toa';
});
app.use(toaStatic({
  root: 'examples/static',
  maxAge: 1000 * 60
}));

app.listen(3000);
