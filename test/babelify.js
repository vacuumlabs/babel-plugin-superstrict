import * as babel from 'babel-core';

export default function babelify(sourceFileName) {
  return babel.transformFileSync(sourceFileName, {
    babelrc: false,
    presets: ['es2015'],
    plugins: [
      [
        '../../lib',
        {
          'directivePolicy': 'optin',
          'superstrictRuntime': '../lib/superstrict_runtime.js'
        }
      ]
    ]
  }).code;
}
