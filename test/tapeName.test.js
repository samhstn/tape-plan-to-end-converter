const tapeName = require('../utils/tapeName.js');
const tape = require('tape');

const tapeFile = `
  const tape = require('tape');
  const thing = require('thing');

  tape('hi', (t) => {
    t.ok(true);
    t.end();
  });
`;

const testFile = `
  const test = require('tape');
  const thing = require('thing');

  test('hi', (t) => {
    t.ok(true);
    t.end();
  });
`;

tape('when tape', (t) => {
  const actual = tapeName(tapeFile);
  const expected = 'tape';

  t.equal(actual, expected);
  t.end();
});

tape('when test', (t) => {
  const actual = tapeName(testFile);
  const expected = 'test';

  t.equal(actual, expected);
  t.end();
});

