'use superstrict';

try {
  var map = new Map([['a', 1], ['b', 2], ['c', 3]]);
  if ('a' in map) {
    'ok';
  }
} catch (e) {
}
