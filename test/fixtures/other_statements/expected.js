"use strict";

assert(x in a);
if (a[x] == 'a') {
  b = 'b';
}

assert(0 in b);
for (var a = b[0]; a < 50; a++) {}
