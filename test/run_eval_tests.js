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
 'immutable_map_index_method', 'immutable_map_property_existing_key',
 'immutable_map_property_non_existing_key', 'immutable_map_property_method',
 'map_index_success', 'map_index_fail', 'map_index_method',
 'map_property_existing_key', 'map_property_non_existing_key',
 'map_property_method', 'weak_map_index_success', 'weak_map_index_fail',
 'weak_map_index_method', 'casting_add_numbers', 'casting_add_strings',
 'casting_add_objects', 'casting_add_arrays', 'casting_add_bools',
 'casting_subtract_numbers', 'casting_subtract_strings',
 'casting_subtract_objects', 'casting_subtract_arrays', 'casting_subtract_bools',
 'casting_multiply_numbers', 'casting_multiply_strings',
 'casting_multiply_objects', 'casting_multiply_arrays', 'casting_multiply_bools',
 'casting_divide_numbers', 'casting_divide_strings', 'casting_divide_objects',
 'casting_divide_arrays', 'casting_divide_bools', 'casting_remainder_numbers',
 'casting_remainder_strings', 'casting_remainder_objects',
 'casting_remainder_arrays', 'casting_remainder_bools'
].map(test);
