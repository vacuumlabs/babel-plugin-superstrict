'use superstrict';

try {
  var a = {
    b: 1,
    func: function () {
      return this.b;
    }
  };
  var c = a.func();
  'ok';
} catch (e) {
}
