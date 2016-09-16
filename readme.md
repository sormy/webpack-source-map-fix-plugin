# Webpack Source Map Fix Plugin #

## DEPRECATION NOTICE ##

The same or even better effect could be reached without this plugin
if you will use alternative webpack configuration for `devtoolModuleFilenameTemplate`:

```javascript
modules.exports = {
  ...

  output: {
    ...

    devtoolModuleFilenameTemplate: function (info) {
      var relPath = info.resourcePath
        .replace(/^.*~/, '~')
        .replace(/^(webpack:\/\/\/)+/, '')
        .replace(/^\.\//, '')
        .replace(/^\(webpack\)-/, '(webpack)/')
        .replace(/^webpack\/bootstrap/, '(webpack)/bootstrap');
      return 'webpack:///' + relPath + '?' + info.hash;
    }
  }

  ...
};
```

## Why? ##

Have you ever seen source map paths like below?

- webpack:///./~/bla-bla-bla
- webpack:///./bla-bla-bla
- webpack:///~/bla-bla-bla
- webpack:///webpack:///bla-bla-bla
- webpack:///~/bla-bla-bla/~/bla-bla-bla
- webpack:///(webpack)-bla-bla-bla
- webpack:///(webpack)/bla-bla-bla
- webpack:///webpack/bootstrap bla-bla-bla

This plugin performs a trivial fix on source map path to normalize path:

```javascript
var relPath = path
  .replace(/^.*~/, '~')
  .replace(/^(webpack:\/\/\/)+/, '')
  .replace(/^\.\//, '')
  .replace(/^\(webpack\)-/, '(webpack)/')
  .replace(/^webpack\/bootstrap/, '(webpack)/bootstrap');
return 'webpack:///' + relPath + '?' + info.hash;
```

- `/~/` is well know alias for node_modules when css import is used
- `/./` is relative to root import
- `webpack:///webpack:///` comes from buggy url rewrite engine

## Usage ##

```shell
npm install webpack-source-map-fix-plugin --save-dev
```

webpack.config.js:

```javascript
...

var WebpackSourceMapFixPlugin = require('webpack-source-map-fix-plugin');

module.exports = {
  ...
  devtool: 'source-map',
  ...
  plugins: [
    ...
    new WebpackSourceMapFixPlugin()
  ];
  ...
}
```

## Limitations ##

Current verson will work only if source maps are bundled in separate files.
