var brfs = require('brfs');
var through = require('through2');
var bl = require('bl');

module.exports = function () {

  return through.obj(function (file, enc, callback) {
    var stream = brfs(file.path);
    if (file.isBuffer()) {
      var that = this;
      file.pipe(stream)
          .pipe(bl(function(err, data){
            file.contents = data;
            that.push(file);
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
