'use superstrict';

try {
  var map = new Map([['a', 1], ['b', 2], ['c', 3]]);
  var a = map.a;
  'ok';
} catch (e) {
}
