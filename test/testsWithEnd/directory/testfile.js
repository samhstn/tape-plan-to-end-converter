const tape = require('tape');
const doAnotherThing = require('doAnotherThing');

tape('testing', (t) => {

  doThing.one(() => {
    doThing.two((data) => {
      t.equal(data, 'thing');
t.end();
    });
  });
});

tape('more testing', (t) => {

  doAnotherThing.one(() => {
    doThing.two((data) => {
      t.equal(data, 'thing');
t.end();
    });
  });
});

[
  'thing1',
  'thing2',
  'thing3',
  'thing4',
  'thing5',
  'thing6',
].forEach((thing) => {
  tape('thing test', (t) => {

    t.equal(thing.error, false);
t.end();
  });
});

tape.onFinish(() => {
  doThing.finish();
});
