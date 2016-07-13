function ImplicitCastingException(firstOperand, secondOperand, operator) {
  // TODO: add propper message here, the original code was too buggy it should be fixed
  /*
  const firstOperand = firstOperand;
  const secondOperand = secondOperand;
  const operator = operator;
  let msg

  if (secondOperand) {
    msg = `Binary operation '${operation}' is not defined between ` +
      `operands '${leftOperand}' and '${rightOperand}'` +
      `of types '${typeof leftOperand}' and ` +
      `'${typeof rightOperand}', respectively, without implicit ` +
      `casting.`;
  } else {
    msg = `Unary operation '${operation}' is not defined on operand ` +
      `'${leftOperand}' of type '${typeof leftOperand}' ` +
      `without implicit casting.`;
  }
  */
  return new Error('ImplicitCastingException');
};

function DivisionByZeroException(operand) {
  /*
  this.operand = operand;

  this.toString = () => {
    return `Division of '${this.operand}' by zero.`;
  };
  */
  return new Error('DivisionByZeroException');
};

function InvalidOperationResultException(result, funcName, ...params) {
  /*
  this.result = result;
  this.params = params;

  this.toString = () => {
    switch (funcName) {
    case 'checkCastingBinary':
      let leftOperand = params[0];
      let rightOperand = params[1];
      let operator = params[2];
      return `Invalid operation result: ${leftOperand} ${operator} ${rightOperand} = ${result}.`;
    case 'checkCastingUnaryPrefix':
      let operand = params[0];
      operator = params[1];
      return `Invalid operation result: ${operator}${operand} = ${result}.`;
    case 'checkCastingUnaryPostfix':
      operand = params[0];
      operator = params[2];
      return `Invalid operation result: ${operand}${operator} = ${result}.`;
    }
  };
  */
  return new Error('InvalidOperationResultException');
};

const bothOfSameType = (first, second, type) => {
  return ((typeof first === type) && (typeof second === type));
};

const checkInvalidValues = (func) => {
  return (...params) => {
    let toReturn;

    try {
      toReturn = func(...params);
    } catch (e) {
      throw e;
    }

    if ([NaN, Infinity, -Infinity].indexOf(toReturn) !== -1) {
      throw InvalidOperationResultException(toReturn, func.name, ...params);
    } else {
      return toReturn;
    }
  };
};

const checkCastingBinary = (leftOperand, rightOperand, operator) => {
  switch(operator) {
  case '+':
    if (bothOfSameType(leftOperand, rightOperand, 'number') ||
        bothOfSameType(leftOperand, rightOperand, 'string')) {
      return leftOperand + rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '-':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand - rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '*':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand * rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '/':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      if (rightOperand === 0) {
        throw DivisionByZeroException(leftOperand);
      } else {
        return leftOperand / rightOperand;
      }
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '%':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      if (rightOperand === 0) {
        throw DivisionByZeroException(leftOperand);
      } else {
        return leftOperand % rightOperand;
      }
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '<':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand < rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '>':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand > rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '<=':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand <= rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '>=':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand >= rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '<<':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand << rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '>>':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand >> rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '>>>':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand >>> rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '&':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand & rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '^':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand ^ rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '|':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand | rightOperand;
    } else {
      throw ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  }
};

const checkCastingUnaryPrefix = (operand, operator) => {
  if (typeof operand !== 'number') {
    throw ImplicitCastingException(operand, undefined, operator);
  }

  switch (operator) {
  case '++':
    return ++operand;
  case '--':
    return --operand;
  case '+':
    return +operand;
  case '-':
    return -operand;
  case '~':
    return ~operand;
  }
};

const checkCastingUnaryPostfix = (originalOperand, operand, operator) => {
  if (typeof originalOperand !== 'number') {
    throw ImplicitCastingException(originalOperand, undefined, operator);
  }

  return originalOperand; // postfix operators return original value and then
                          // incremnet/decrement it
};

exports.__superstrictCheckCastingBinary__ = checkInvalidValues(checkCastingBinary);
exports.__superstrictCheckCastingUnaryPrefix__ = checkInvalidValues(checkCastingUnaryPrefix);
exports.__superstrictCheckCastingUnaryPostfix__ = checkInvalidValues(checkCastingUnaryPostfix);
