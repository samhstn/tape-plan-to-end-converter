const tape = require('tape');
const doAnotherThing = require('doAnotherThing');

tape('testing', (t) => {
  t.plan(5);

  doThing.one(() => {
    doThing.two((data) => {
      t.equal(data, 'thing');
    });
  });
});

tape('more testing', (t) => {
  t.plan(1);

  doAnotherThing.one(() => {
    doThing.two((data) => {
      t.equal(data, 'thing');
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
    t.plan(222222);

    t.equal(thing.error, false);
  });
});

tape.onFinish(() => {
  doThing.finish();
});
