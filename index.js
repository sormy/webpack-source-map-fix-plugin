function SourceMapFixPlugin() {
}

SourceMapFixPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    for (var name in compilation.assets) {
      if (/\.(js|css).map$/.test(name)) {
        var asset = compilation.assets[name];
        this.fixSourceMapAsset(asset);
      }
    }
    callback();
  }.bind(this));
};

SourceMapFixPlugin.prototype.fixSourceMapAsset = function (asset) {
  var sourceMap = JSON.parse(asset._value);
  this.fixSourceMapObject(sourceMap);
  asset._value = JSON.stringify(sourceMap);
};

SourceMapFixPlugin.prototype.fixSourceMapObject = function (sourceMap) {
  sourceMap.sources = sourceMap.sources
    .map(function (path) {
      return this.fixSourcePath(path);
    }.bind(this));
};

SourceMapFixPlugin.prototype.fixSourcePath = function (path) {
  var relPath = path
    .replace(/^.*~/, '~')
    .replace(/^(webpack:\/\/\/)+/, '')
    .replace(/^\.\//, '')
    .replace(/^\(webpack\)-/, '(webpack)/')
    .replace(/^webpack\/bootstrap/, '(webpack)/bootstrap');
  return 'webpack:///' + relPath + '?' + info.hash;
};

module.exports = SourceMapFixPlugin;
