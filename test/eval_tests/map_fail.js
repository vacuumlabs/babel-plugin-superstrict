'use superstrict';

try {
  var map = new Map([['a', 1], ['b', 2], ['c', 3]]);
  var d = map.get('d');
} catch (e) {
  'ok';
}
