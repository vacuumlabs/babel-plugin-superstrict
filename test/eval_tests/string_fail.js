'use superstrict';

try {
  var a = 'abcde';
  for (var i = 0; i < 10; i++) {
    a[i];
  }
} catch (e) {
  'ok';
}
