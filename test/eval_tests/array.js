'use superstrict';

try {
  var a = [0, 1, 2, 3, 4, 5];
  for (var i = 0; i < 6; i++) {
    a[i];
  }
} catch (e) {
  'ok';
}
