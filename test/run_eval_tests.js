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
 'casting_remainder_arrays', 'casting_remainder_bools',
 'casting_prefix_increment_number', 'casting_prefix_increment_string',
 'casting_prefix_increment_object', 'casting_prefix_increment_array',
 'casting_prefix_increment_bool', 'casting_prefix_decrement_number',
 'casting_prefix_decrement_string', 'casting_prefix_decrement_object',
 'casting_prefix_decrement_array', 'casting_prefix_decrement_bool',
 'casting_postfix_increment_number', 'casting_postfix_increment_string',
 'casting_postfix_increment_object', 'casting_postfix_increment_array',
 'casting_postfix_increment_bool', 'casting_postfix_decrement_number',
 'casting_postfix_decrement_string', 'casting_postfix_decrement_object',
 'casting_postfix_decrement_array', 'casting_postfix_decrement_bool',
 'casting_positive_number', 'casting_positive_string', 'casting_positive_object',
 'casting_positive_array', 'casting_positive_bool', 'casting_negative_number',
 'casting_negative_string', 'casting_negative_object', 'casting_negative_array',
 'casting_negative_bool', 'casting_less_numbers', 'casting_less_strings',
 'casting_less_objects', 'casting_less_arrays', 'casting_less_bools',
 'casting_less_equal_numbers', 'casting_less_equal_strings',
 'casting_less_equal_objects', 'casting_less_equal_arrays',
 'casting_less_equal_bools', 'casting_greater_numbers', 'casting_greater_strings',
 'casting_greater_objects', 'casting_greater_arrays', 'casting_greater_bools',
 'casting_greater_equal_numbers', 'casting_greater_equal_strings',
 'casting_greater_equal_objects', 'casting_greater_equal_arrays',
 'casting_greater_equal_bools', 'casting_left_shift_numbers',
 'casting_left_shift_strings', 'casting_left_shift_objects',
 'casting_left_shift_arrays', 'casting_left_shift_bools',
 'casting_signed_right_shift_numbers', 'casting_signed_right_shift_strings',
 'casting_signed_right_shift_objects', 'casting_signed_right_shift_arrays',
 'casting_signed_right_shift_bools', 'casting_unsigned_right_shift_numbers',
 'casting_unsigned_right_shift_strings', 'casting_unsigned_right_shift_objects',
 'casting_unsigned_right_shift_arrays', 'casting_unsigned_right_shift_bools',
 'casting_bitwise_and_numbers', 'casting_bitwise_and_strings',
 'casting_bitwise_and_objects', 'casting_bitwise_and_arrays',
 'casting_bitwise_and_bools', 'casting_bitwise_xor_numbers',
 'casting_bitwise_xor_strings', 'casting_bitwise_xor_objects',
 'casting_bitwise_xor_arrays', 'casting_bitwise_xor_bools',
 'casting_bitwise_or_numbers', 'casting_bitwise_or_strings',
 'casting_bitwise_or_objects', 'casting_bitwise_or_arrays',
 'casting_bitwise_or_bools', 'casting_bitwise_not_number',
 'casting_bitwise_not_string', 'casting_bitwise_not_object',
 'casting_bitwise_not_array', 'casting_bitwise_not_bool',
 'division_by_zero', 'division_of_zero_by_zero', 'integer_overflow',
 'check_in_array', 'check_in_object', 'check_in_string', 'check_in_immutable_map',
 'check_in_immutable_set', 'check_in_map', 'check_in_weak_map', 'check_in_set',
 'check_in_weak_set'
].map(test);
