'use superstrict';

try {
  var Immutable = require('immutable');

  var map = Immutable.Map({
    key: Immutable.Map({
      'a': 1
    })});
  var a = map.getIn(['key', 'b', 'c']);
} catch (e) {
  'ok';
}
