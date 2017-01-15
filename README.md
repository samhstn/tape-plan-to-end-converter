[![Travis](https://img.shields.io/travis/shouston3/tape-plan-to-end-converter.svg?style=flat-square)](https://travis-ci.org/shouston3/tape-plan-to-end-converter)

# Tape Plan to End test converter

Recursively converts all files in a directory which use `t.plan` syntax to instead use `t.end`.

See the tests for how this is done

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

# How to use

Clone the repository
```bash
git clone `github.com/shouston3/tape-plan-to-end-converter.git`
```

Set up a javascript file called `plan-to-end.js` in the root of the directory you want to change the tests for as follows:
```js
require('/path/to/tape-plan-to-end-converter/index.js')(__dirname);
```

Then run `node plan-to-end.js` and your tests should have changed

Ensure you use version control before attempting this, also afterwards the indents may be a little messed up, so run `eslint . --fix`

