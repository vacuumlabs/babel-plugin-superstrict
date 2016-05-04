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
 'immutable_map_index_success', 'immutable_map_index_fail',
 'immutable_map_index_method', 'immutable_map_property_success',
 'immutable_map_property_fail', 'immutable_map_property_method',
 'map_index_success', 'map_index_fail', 'map_index_method',
 'map_property_success', 'map_property_fail', 'map_property_method',
 'weak_map_index_success', 'weak_map_index_fail', 'weak_map_index_method'
].map(test);
