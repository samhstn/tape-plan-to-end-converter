const lastLineNumberContaining = require('./lastLineNumberContaining.js');

const removePlan = (test) => {
  const line = lastLineNumberContaining('t.plan(')(test);

  return test.split('\n').filter((_, i) => i !== line - 1).join('\n');
}

module.exports = removePlan;
