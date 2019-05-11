var brfs = require('brfs');
var through = require('through2');
var Vinyl = require('vinyl');

module.exports = function () {

  return through.obj(function (file, enc, callback) {
    var stream = brfs(file.path);
    var inline;

    if (file.isBuffer()) {
      stream.end(file.contents);

      inline = new Vinyl({
        contents: stream,
        cwd: file.cwd,
        base: file.base,
        path: file.path
      });

      this.push(inline);

      return callback();
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(stream);
      this.push(file);
      return callback();
    }

  });

};
