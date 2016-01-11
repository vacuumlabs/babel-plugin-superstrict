'use superstrict';

try {
  var a = {a: 1, b: 2};
  var c = a.nonexistent;
} catch (e) {
  'ok';
}
