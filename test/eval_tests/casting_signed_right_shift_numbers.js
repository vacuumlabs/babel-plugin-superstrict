'use superstrict';

try {
  if ((-25 >> 3) === -4) {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
