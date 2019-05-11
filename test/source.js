var fs = require('fs');

var foo = function() {};
var data = fs.readFileSync('./data.txt');

foo();
