'use superstrict';

try {
  var Immutable = require('immutable');

  var map = Immutable.Map({a:1, b:2, c:3, get: 4});
  var a = map.get('a'); // does not return key 'get'
  if (a === 1) {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
