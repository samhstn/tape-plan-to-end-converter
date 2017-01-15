const appendEnd = require('../utils/appendEnd.js');
const tape = require('tape');

const tapeFile = `
  const tape = require('tape');
  const thing = require('thing');

  tape('hi', (t) => {
    t.plan(1);

    t.ok(true);
  });
`;

const withEndFile = `
  const tape = require('tape');
  const thing = require('thing');

  tape('hi', (t) => {
    t.plan(1);

    t.ok(true);
t.end();
  });
`;

tape('removes plan', (t) => {
  const actual = appendEnd(tapeFile);
  const expected = withEndFile;

  t.equal(actual, expected);
  t.end();
});

