'use superstrict';

try {
  let o = {
    a: 0,
    get b() {
      return this.a + 1;
    },
    set c(x) {
      this.a = x * 2;
    }
  };

  o.b;
  o.c = 10;
  'ok';
} catch (e) {
}
