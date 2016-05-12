'use superstrict';

try {
  if ('a' in ['a', 'b', 'c']) {
    'ok';
  }
} catch (e) {
}
