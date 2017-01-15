const removePlan = require('../utils/removePlan.js');
const tape = require('tape');

const tapeFile = `
  const tape = require('tape');
  const thing = require('thing');

  tape('hi', (t) => {
    t.plan(1);

    t.ok(true);
  });
`;

const withoutPlanFile = `
  const tape = require('tape');
  const thing = require('thing');

  tape('hi', (t) => {

    t.ok(true);
  });
`;

tape('removes plan', (t) => {
  const actual = removePlan(tapeFile);
  const expected = withoutPlanFile;

  t.equal(actual, expected);
  t.end();
});

