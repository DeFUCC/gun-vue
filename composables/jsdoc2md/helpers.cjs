var fs = require("fs");

var str = fs.readFileSync("../README.md", { encoding: 'utf8' });

exports.toLowerCase = function (text) {
  return text.toLowerCase();
};


exports.readme = function () {
  return str
}