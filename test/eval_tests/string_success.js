'use superstrict';

try {
  var a = 'abcde';
  for (var i = 0; i < a.length; i++) {
    a[i];
  }
  'ok';
} catch (e) {
}
