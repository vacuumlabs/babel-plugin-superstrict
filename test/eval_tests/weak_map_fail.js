'use superstrict';

try {
  var obj1 = {
    'a': 1
  };

  var obj2 = {
    'a': 2
  };

  var map = new WeakMap([[obj1, 1], [obj2, 2]]);
  var d = map.get({});
} catch (e) {
  'ok';
}
