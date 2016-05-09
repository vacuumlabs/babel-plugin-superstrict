'use superstrict';

try {
  true >>> false;
} catch (e) {
  'ok';
}
