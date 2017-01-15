[![Travis](https://img.shields.io/travis/shouston3/tape-plan-to-end-converter.svg?style=flat-square)](https://travis-ci.org/shouston3/tape-plan-to-end-converter)

# Tape Plan to End test converter

Converts all of your tests which are using `t.plan` to instead use `t.end`.

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

To use it, simply cd into the directory that you want to change the tests for and run the `index.js` file
