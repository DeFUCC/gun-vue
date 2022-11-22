var fs = require("fs");

var str = fs.readFileSync("../README.md");

exports.toLowerCase = function (text) {
  return text.toLowerCase();
};


exports.readme = function () {
  return str
}