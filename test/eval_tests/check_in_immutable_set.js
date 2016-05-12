'use superstrict';

try {
  var Immutable = require('immutable');

  var s = Immutable.Set('a', 'b', 'c');
  if ('a' in s) {
    'ok';
  }
} catch (e) {
}
