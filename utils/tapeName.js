const tapeName = (file) => {
  return file
    .split('\n')
    .filter(
      (line) => line.includes('require') && line.includes('tape')
    )[0].trim().split(' ')[1];
}

module.exports = tapeName;
