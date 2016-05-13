'use superstrict';

try {
  var Immutable = require('immutable');

  var map = Immutable.Map({a:1, b:2, c:3});
  if ('a' in map) {
    'ok';
  }
} catch (e) {
}
