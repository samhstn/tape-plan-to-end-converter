const fs = require('fs');
const path = require('path');
const assert = require('assert');
const read = require('fs-readdir-recursive');
const bluebird = require('bluebird');

const readFile = bluebird.promisify(fs.readFile);
const writeFile = bluebird.promisify(fs.writeFile);

const tapeName = require('./utils/tapeName.js');
const appendEnd = require('./utils/appendEnd.js');
const removePlan = require('./utils/removePlan.js');

const convertTest = (test) => {
  if (!test.includes('t.plan')) {
    return test;
  }

  return removePlan(appendEnd(test));
}

const seperateTests = (file) => file.split(tapeName(file) + '(');

const convertFile = (file) => {
  return readFile(file, 'utf8')
    .then(
      (data) => writeFile(
        file,
        data.includes('require(\'tape\')')
        || data.includes('require("tape")') 
        ? seperateTests(data)
          .map(
            (test) => convertTest(test)
          ).join(tapeName(data) + '(')
        : data
      )
    )
    .catch((err) => assert(!err, err));
}

const convertDir = (dir) => {
  const files = read(dir);

  return Promise.all(
    files.map(
      (file) => convertFile(path.join(dir, file))
    )
  );
}

module.exports = convertDir;
