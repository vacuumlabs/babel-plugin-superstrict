'use strict'

import babelify from './babelify';
import assert from 'assert';
import path from 'path';

function test(source) {
  let sourceFileName = path.resolve(__dirname, 'eval_tests', `${source}.js`);
  it(source, () => {
    let res = babelify(sourceFileName);
    //console.log(res);
    assert.equal(eval(res), 'ok');
  });
}

['basic', 'array'].map(test);
