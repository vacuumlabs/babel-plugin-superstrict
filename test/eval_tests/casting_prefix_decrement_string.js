'use superstrict';

try {
  var a = 'abc';
  --a;
} catch (e) {
  'ok';
}
