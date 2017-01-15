const tape = require('tape');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const ncp = require('ncp'); // recursive copy of directory
const rmdir = require('rimraf'); // recursive removal of directory
const bluebird = require('bluebird');

const converter = require('../index.js');

const readFileAsync = bluebird.promisify(fs.readFile);
const ncpAsync = bluebird.promisify(ncp.ncp);

const readUtf8 = (filePath) => readFileAsync(filePath, 'utf8');

const tempDirPath = path.join(__dirname, 'tempdir');
const firstTempTestFilePath = path.join(__dirname, 'tempdir', 'testfile.js');
const secondTempTestFilePath = path.join(__dirname, 'tempdir', 'directory', 'testfile.js');

const endDirPath = path.join(__dirname, 'testsWithEnd');
const firstEndTestFilePath = path.join(__dirname, 'testsWithEnd', 'testfile.js');
const secondEndTestFilePath = path.join(__dirname, 'testsWithEnd', 'directory', 'testfile.js');

const checkFilesAreEqual = (t, filepath, file) => {
  return readUtf8(filepath)
    .then((data) => new Promise((resolve) => {
      t.equal(file, data);

      resolve();
    }))
    .catch((err) => assert(!err, err));
}

tape('should read every file in the specified directory', (t) => {

  ncpAsync(path.join(__dirname, 'testsWithPlan'), 'test/tempdir')
    .then(() => converter(tempDirPath))
    .then(() => readUtf8(firstTempTestFilePath))
    .then((file) => checkFilesAreEqual(t, firstEndTestFilePath, file))
    .then(() => readUtf8(secondTempTestFilePath))
    .then((file) => checkFilesAreEqual(t, secondEndTestFilePath, file))
    .then(t.end)
    .catch((err) => {
      t.end();
      assert(!err, err)
    });

});

tape.onFinish(() => rmdir(tempDirPath, (err) => assert(!err, err)));

