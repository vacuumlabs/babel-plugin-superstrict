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

['basic', 'array', 'getters_setters', 'left_side_of_assignment',
 'detect_directive', 'flexible_directives', 'safeGetAttr', 'this',
 'immutable_map_success', 'immutable_map_fail', 'immutable_map_default',
 'map_success', 'map_fail', 'weak_map_success', 'weak_map_fail'].map(test);
