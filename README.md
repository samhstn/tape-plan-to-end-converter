[![Travis](https://img.shields.io/travis/shouston3/tape-plan-to-end-converter.svg?style=flat-square)](https://travis-ci.org/shouston3/tape-plan-to-end-converter)

# Tape Plan to End test converter

Recursively converts all files in a directory which use `t.plan` syntax to instead use `t.end`.

This will convert

```js
tape('hi', (t) => {
  t.plan(1);

  t.ok(true);
});
```

to

```js
tape('hi', (t) => {
  t.ok(true);
  t.end();
});
```

On all your tests

See the before: `test/testsWithPlan` and after: `test/testsWithEnd` directories for example conversions.

# How to use

Clone the repository
```bash
git clone `github.com/shouston3/tape-plan-to-end-converter.git`
```

Point the `bin/cmd.js` file at the directory that you would like to recursively translate, for example:
```bash
./tape-plan-to-end-converter/bin/cmd.js ./app/test
```

Ensure you use version control before attempting this and afterwards the indents may be a little off, so run `eslint . --fix`

