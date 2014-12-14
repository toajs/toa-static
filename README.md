toa-static v0.3.0 [![Build Status](https://travis-ci.org/toajs/toa-static.svg)](https://travis-ci.org/toajs/toa-static)
====
A static server module for toa.

## [toa](https://github.com/toajs/toa)

## Demo

```js
'use strict';

var Toa = require('toa');
var toaStatic = require('toa-static')('examples/static');
```

**use as module:**
```js
Toa(function (Thunk) {
  return Thunk.call(this, toaStatic);
}).listen(3000);
```

**use as middleware:**
```js
var app = Toa();
app.use(toaStatic);
app.listen(3000);
```

## Installation

```bash
npm install toa-static
```

## API

```js
var ToaStatic = require('toa-static');
```

### ToaStatic(options)

Return a thunk function.

- `options.root` (String) - The directory you wish to serve, default to `process.cwd`.
- `options.index` (String) - By default this module will send "index.html" files in response to a request on a directory. To disable this set `false` or to supply a new index pass a string.
- `options.etag` (Boolean) - Enable or disable etag generation, defaults to `true`.
- `options.maxAge` (Number) - Cache control max age (ms) for the files, default to `24 * 60 * 60 * 30 * 1000`.
- `options.cacheControl` (String) - Optional cache control header. Overrides `options.maxAge`.
- `options.compress` (Boolean) - When request's accept-encoding include gzip or deflate, files will compressed.
- `options.fileMap` (Object) - Object map of aliases.
- `options.prefix` (String) - The url prefix you wish to serve as static request, default to `'/'`.
- `options.files` (Array) - files path you wish to serve.
- `options.staticPath` (Function) - Function to return a custom static file path. the `context` of this function is **toa's context**.

## License

The MIT License (MIT)
