toa-static
====
A static server module for toa.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

## [toa](https://github.com/toajs/toa)

## Demo

```js
'use strict';

var Toa = require('toa')
var toaStatic = require('toa-static')('examples/static')
```

**use as middleware:**
```js
var app = Toa()
app.use(toaStatic)
app.listen(3000)
```

## Installation

```bash
npm install toa-static
```

## API

```js
var ToaStatic = require('toa-static')
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
- `options.prunePrefix` (Boolean) - Prune the prefix from URL path, default to `false`.
- `options.files` (Array) - files path you wish to serve.
- `options.staticPath` (Function) - Function to return a custom static file path. the `context` of this function is **toa's context**.
- `options.maxCacheLength` (Number) - The maximum length of the files cache in bytes. if cache's size > maxCacheLength, then the least recently used (LRU) file will be removed. if maxCacheLength === -1, cache will not be used. if maxCacheLength === 0, there is no limit.
, default to `0`.

## License

The MIT License (MIT)

[npm-url]: https://npmjs.org/package/toa-static
[npm-image]: http://img.shields.io/npm/v/toa-static.svg

[travis-url]: https://travis-ci.org/toajs/toa-static
[travis-image]: http://img.shields.io/travis/toajs/toa-static.svg

[downloads-url]: https://npmjs.org/package/toa-static
[downloads-image]: http://img.shields.io/npm/dm/toa-static.svg?style=flat-square
