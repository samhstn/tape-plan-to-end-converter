const tape = require('tape');
const lastLineNumberContaining = require('../utils/lastLineNumberContaining.js');

tape('returns the correct line number of a string', (t) => {
  const actual =
    lastLineNumberContaining('rld')('require(\'hi\')\nworld\nthing\nrld');
  const expected = 4;

  t.equal(actual, expected);
  t.end()
});

