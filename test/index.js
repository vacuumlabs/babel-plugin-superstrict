// from https://github.com/shuhei/babel-plugin-auto-assign/blob/master/test/index.js
// Copyright (c) 2015, Shuhei Kagawa <shuhei.kagawa@gmail.com>
// Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var babel = require('babel-core');

function test(fixtureName) {
  it(fixtureName, function () {
    var fixturePath = path.resolve(__dirname, 'fixtures', fixtureName, 'fixture.js');
    var expectedPath = path.resolve(__dirname, 'fixtures', fixtureName, 'expected.js');
    var actual = babel.transformFileSync(fixturePath, {
      plugins: ['../lib']
    }).code;

    var expected = fs.readFileSync(expectedPath, { encoding: 'utf8' });
    assert.equal(actual + '\n', expected);
  });
}

[
  'const_array_index',
  'ignore_left_side_of_assignment',
  'const_object_property',
  'dynamic_array_index'
].map(test);
