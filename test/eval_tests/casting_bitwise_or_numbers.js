'use superstrict';

try {
  if ((25 | 3) === 27) {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
