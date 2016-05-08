'use superstrict';

try {
  var a = 2;
  if (((a--) === 2) && (a === 1)) {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
