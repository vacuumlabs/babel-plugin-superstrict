import * as babel from 'babel-core';

export default function babelify(sourceFileName) {
  return babel.transformFileSync(sourceFileName, {
    babelrc: false,
    presets: ['es2015'],
    plugins: [
      ['../lib', {
        'safeGetFilePath': '../lib/safe_get.js',
        'directivePolicy': 'opt in'
      }]
    ]
  }).code;
}
