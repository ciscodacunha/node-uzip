'use strict';

var test = require('tap').test;
var fs = require('fs');
var path = require('path');
var fstream = require('fstream');
var temp = require('temp');
var unzip = require('../');

test("uncompressed archive", function (t) {
  var archive = path.join(__dirname, './data/uncompressed.zip');

  temp.mkdir('node-unzip-', function (err, dirPath) {
    var unzipParser = unzip.Parse();
    unzipParser.on('error', function(err) {
      t.fail(err);
    });

    var writer = fstream.Writer(dirPath);
    writer.on('error', function(err) {
      t.fail(err);
    });
    writer.on('end', function() {
      //some code
      t.end();
    });

    fs.createReadStream(archive).pipe(unzipParser).pipe(writer);
  });
});