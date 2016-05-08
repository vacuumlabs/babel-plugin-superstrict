'use superstrict';

try {
  if (('abc' + 'de') === 'abcde') {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
