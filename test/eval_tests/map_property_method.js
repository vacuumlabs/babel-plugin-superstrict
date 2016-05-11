'use superstrict';

try {
  var map = new Map([['a', 1], ['b', 2], ['c', 3]]);
  var a = map.get('a'); // does not return key 'get'
  if (a === 1) {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
