var brfs = require('brfs');
var through = require('through2');

module.exports = function () {

  return through.obj(function (file, enc, callback) {
    if (file.isStream()) {
      var stream = brfs(file.path);
      file.contents = file.contents.pipe(stream);
    }

    this.push(file);
    return callback();
  });

};
