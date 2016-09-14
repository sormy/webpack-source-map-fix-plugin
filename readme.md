# Webpack Source Map Fix Plugin #

## Why? ##

Have you ever seen source map paths like below?

- webpack:///./~/bla-bla-bla
- webpack:///./bla-bla-bla
- webpack:///~/bla-bla-bla
- webpack:///webpack:///bla-bla-bla

This plugin performs a trivial fix on source map path to normalize path:

```javascript
path
  .replace('webpack:///webpack:///', 'webpack:///')
  .replace('webpack:///./', 'webpack:///')
  .replace('webpack:///~/', 'webpack:///node_modules/');
```

`/~/` is well know alias for node_modules when css import is used
`/./` is relative to root import
`webpack:///webpack:///` comes from buggy url rewrite engine

## Usage ##

```shell
npm install webpack-source-map-fix-plugin
```

webpack.config.js:

```javascript
...

var WebpackSourceMapFixPlugin = require('webpack-source-map-fix-plugin');

module.exports = {
  ...
  plugins: [
    ...
    new WebpackSourceMapFixPlugin()
  ];
  ...
}
...
