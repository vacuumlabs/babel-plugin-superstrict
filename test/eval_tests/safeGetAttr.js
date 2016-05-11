'use superstrict';

try {
  var a = {};
  a[Symbol.for('safeGetAttr')] = function(key) {
    return key;
  };

  var c = a.nonexistent;
  'ok';
} catch (e) {
}
