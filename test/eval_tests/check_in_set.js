'use superstrict';

try {
  var s = new Set(['a', 'b', 'c']);
  if ('a' in s) {
    'ok';
  }
} catch (e) {
}
