'use strict';
'use superstrict';

var safeGetItem = require('../lib/safe_get.js').safeGetItem;

var safeGetAttr = require('../lib/safe_get.js').safeGetAttr;

var checkIn = require('../lib/safe_get.js').checkIn;

var checkCastingBinary = require('../lib/check_casting.js').checkCastingBinary;

var checkCastingUnaryPrefix = require('../lib/check_casting.js').checkCastingUnaryPrefix;

var checkCastingUnaryPostfix = require('../lib/check_casting.js').checkCastingUnaryPostfix;

(function () {
  var generateMatrix = function generateMatrix(size, min, max) {
    var matrix = [];

    for (var rowNum = 0; checkCastingBinary(rowNum, size, '<'); checkCastingUnaryPostfix(rowNum, rowNum++, '++')) {
      var row = [];

      for (var colNum = 0; checkCastingBinary(colNum, size, '<'); checkCastingUnaryPostfix(colNum, colNum++, '++')) {
        var newInt = checkCastingBinary(safeGetItem(Math, 'floor')(checkCastingBinary(safeGetItem(Math, 'random')(), checkCastingBinary(max, min, '-'), '*')), min, '+');
        safeGetItem(row, 'push')(newInt);
      }

      safeGetItem(matrix, 'push')(row);
    }

    return matrix;
  };

  var multiplyMatrices = function multiplyMatrices(firstMatrix, secondMatrix) {
    var result = [];
    var size = safeGetItem(firstMatrix, 'length');

    for (var rowNum = 0; checkCastingBinary(rowNum, size, '<'); checkCastingUnaryPostfix(rowNum, rowNum++, '++')) {
      var row = [];

      for (var colNum = 0; checkCastingBinary(colNum, size, '<'); checkCastingUnaryPostfix(colNum, colNum++, '++')) {
        var sum = 0;
        for (var k = 0; checkCastingBinary(k, size, '<'); checkCastingUnaryPostfix(k, k++, '++')) {
          sum += checkCastingBinary(safeGetAttr(safeGetAttr(firstMatrix, rowNum), k), safeGetAttr(safeGetAttr(secondMatrix, k), colNum), '*');
        }
        safeGetItem(row, 'push')(sum);
      }

      safeGetItem(result, 'push')(row);
    }

    return result;
  };

  var benchmark = function benchmark(testRuns) {
    for (var testRun = 0; checkCastingBinary(testRun, testRuns, '<'); checkCastingUnaryPostfix(testRun, testRun++, '++')) {
      var firstMatrix = generateMatrix(200, 10, 100);
      var secondMatrix = generateMatrix(200, 10, 100);

      multiplyMatrices(firstMatrix, secondMatrix);
    }
  };

  benchmark(1);

  'ok';
})();
