function generateMatrix(size, min, max) {
  var matrix = [];

  for (var rowNum = 0; rowNum < size; rowNum++) {
    var row = [];

    for (var colNum = 0; colNum < size; colNum++) {
	  var newInt = Math.floor(Math.random() * (max - min)) + min;
	  row.push(newInt);
    }

    matrix.push(row);
  }

  return matrix;
}

function multiplyMatrices(firstMatrix, secondMatrix) {
  var result = [];
  var size = firstMatrix.length;

  for (var rowNum = 0; rowNum < size; rowNum++) {
    var row = [];

    for (var colNum = 0; colNum < size; colNum++) {
      var sum = 0;
      for (var k = 0; k < size; k++) {
        sum += firstMatrix[rowNum][k] * secondMatrix[k][colNum];
      }
      row.push(sum);
    }

    result.push(row);
  }

  return result;
}

function benchmark(testRuns) {
  for (var testRun = 0; testRun < testRuns; testRun++) {
    var firstMatrix = generateMatrix(200, 10, 100);
    var secondMatrix = generateMatrix(200, 10, 100);

    multiplyMatrices(firstMatrix, secondMatrix);
  }
}

benchmark(1);
