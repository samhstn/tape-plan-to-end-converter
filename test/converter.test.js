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

const dir = __dirname;
const root = [ dir ];

const tempDir = [ ...root, 'tempdir' ];
const firstTempTestFile = [ ...root, 'tempdir', 'testfile.js'];
const secondTempTestFile = [ ...root, 'tempdir', 'directory', 'testfile.js'];

const endDir = [ ...root, 'testsWithEnd' ];
const firstEndTestFile = [ ...root, 'testsWithEnd', 'testfile.js'];
const secondEndTestFile = [ ...root, 'testsWithEnd', 'directory', 'testfile.js'];

const tempDirPath = path.join.apply(null, tempDir);
const firstTempTestFilePath = path.join.apply(null, firstTempTestFile);
const secondTempTestFilePath = path.join.apply(null, secondTempTestFile);

const endDirPath = path.join.apply(null, endDir);
const firstEndTestFilePath = path.join.apply(null, firstEndTestFile);
const secondEndTestFilePath = path.join.apply(null, secondEndTestFile);

const checkFilesAreEqual = (t, filepath, file) => {
  return readUtf8(filepath)
    .then((data) => new Promise((resolve) => {
      t.equal(file, data);

      resolve();
    }))
    .catch((err) => assert(!err, err));
}

tape('should read every file in the specified directory', (t) => {

  ncpAsync(path.join(dir, 'testsWithPlan'), 'test/tempdir')
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

