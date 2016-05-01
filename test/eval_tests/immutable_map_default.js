'use superstrict';

try {
  var Immutable = require('immutable');

  var map = Immutable.Map({a:1, b:2, c:3});
  var d = map.get('d', 'default_value');
  'ok';
} catch (e) {
}
