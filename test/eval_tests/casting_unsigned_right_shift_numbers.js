'use superstrict';

try {
  if ((-25 >>> 3) === 536870908) {
    'ok';
  } else {
    'fail';
  }
} catch (e) {
}
