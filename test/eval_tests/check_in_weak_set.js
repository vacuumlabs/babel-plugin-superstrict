'use superstrict';

try {
  var obj1 = {
    'a': 1
  };

  var obj2 = {
    'a': 2
  };

  var s = new WeakSet([obj1, obj2]);
  if (obj1 in s) {
    'ok';
  }
} catch (e) {
}
