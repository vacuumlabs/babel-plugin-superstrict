'use superstrict';

try {
  if ('a' in {a: 1, b: 2}) {
    'ok';
  }
} catch (e) {
}
