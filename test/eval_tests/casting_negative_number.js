'use superstrict';

try {
  var a = 2;
  if (-a === -2) {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
