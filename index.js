var brfs = require('brfs');
var through = require('through2');
var gutil = require('gulp-util');
var bl = require('bl');

const PLUGIN_NAME = 'gulp-brfs'

var PluginError = gutil.PluginError;

module.exports = function () {

  return through.obj(function (file, enc, callback) {
    var stream = brfs(file.path);

    if (file.isBuffer()) {
      var self = this;
      file.pipe(stream).pipe(bl(function(err, data){
        file.contents = data;
        self.push(file);
        return callback();
      }));
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(stream);
      this.push(file);
      return callback();
    }

  });

};

// expose core brfs module
module.exports.brfs = brfs;
