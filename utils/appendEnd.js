const lastLineNumberContaining = require('./lastLineNumberContaining.js');

const appendEnd = (test) => {
  const line = lastLineNumberContaining(' t.')(test);
  const lines = test.split('\n');

  return [
    ...lines.slice(0, line),
    't.end();',
    ...lines.slice(line)
  ].join('\n');
}

module.exports = appendEnd;

