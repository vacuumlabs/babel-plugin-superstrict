'use superstrict';

try {
  var a = 2;
  if ((++a) === 3) {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
