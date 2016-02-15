// 'use superstrict';

try {
  var a = {a: 1, b: 2};
  var c = a.nonexistent;
  // should not transpile code and throw an exception
  'ok';
} catch (e) {
}
