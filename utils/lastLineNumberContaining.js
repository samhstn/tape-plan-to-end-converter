const lastLineNumberContaining = (pattern) => (str) => {
  return str
    .substring(0, str.lastIndexOf(pattern))
    .split('\n')
    .length;
}

module.exports = lastLineNumberContaining;
