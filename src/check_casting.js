function ImplicitCastingException(firstOperand, secondOperand, operator) {
  this.firstOperand = firstOperand;
  this.secondOperand = secondOperand;
  this.operator = operator;

  if (this.secondOperand) {
    this.toString = () => {
      return `Binary operation '${this.operation}' is not defined between ` +
             `operands '${this.leftOperand}' and '${this.rightOperand}'` +
             `of types '${typeof this.leftOperand}' and ` +
             `'${typeof this.rightOperand}', respectively, without implicit ` +
             `casting.`;
    };
  } else {
    this.toString = () => {
      return `Unary operation '${this.operation}' is not defined on operand ` +
             `'${this.leftOperand}' of type '${typeof this.leftOperand}' ` +
             `without implicit casting.`;
    };
  }
};

function DivisionByZeroException(operand) {
  this.operand = operand;

  this.toString = () => {
    return `Division of '${this.operand}' by zero.`;
  };
};

function InvalidOperationResultException(result, funcName, ...params) {
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
      throw new InvalidOperationResultException(toReturn, func.name, ...params);
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
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '-':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand - rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '*':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand * rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '/':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      if (rightOperand === 0) {
        throw new DivisionByZeroException(leftOperand);
      } else {
        return leftOperand / rightOperand;
      }
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '%':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      if (rightOperand === 0) {
        throw new DivisionByZeroException(leftOperand);
      } else {
        return leftOperand % rightOperand;
      }
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '<':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand < rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '>':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand > rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '<=':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand <= rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '>=':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand >= rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '<<':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand << rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '>>':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand >> rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '>>>':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand >>> rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '&':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand & rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '^':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand ^ rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '|':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand | rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  }
};

const checkCastingUnaryPrefix = (operand, operator) => {
  if (typeof operand !== 'number') {
    throw new ImplicitCastingException(operand, undefined, operator);
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
    throw new ImplicitCastingException(originalOperand, undefined, operator);
  }

  return originalOperand; // postfix operators return original value and then
                          // incremnet/decrement it
};

exports.checkCastingBinary = checkInvalidValues(checkCastingBinary);
exports.checkCastingUnaryPrefix = checkInvalidValues(checkCastingUnaryPrefix);
exports.checkCastingUnaryPostfix = checkInvalidValues(checkCastingUnaryPostfix);
