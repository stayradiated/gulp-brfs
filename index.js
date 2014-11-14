var brfs = require('brfs');
var through = require('through2');
var gutil = require('gulp-util');

var PluginError = gutil.PluginError;

module.exports = function () {

  return through.obj(function (file, enc, callback) {
    if (file.isBuffer()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
      return callback();
    }

    if (file.isStream()) {
      var stream = brfs(file.path);
      file.contents = file.contents.pipe(stream);
    }

    this.push(file);
    return callback();
  });

};

// expose core brfs module
module.exports.brfs = brfs;
