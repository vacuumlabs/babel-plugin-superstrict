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

const bothOfSameType = (first, second, type) => {
  return ((typeof first === type) && (typeof second === type));
};

exports.checkCastingBinary = (leftOperand, rightOperand, operator) => {
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
      return leftOperand / rightOperand;
    } else {
      throw new ImplicitCastingException(leftOperand, rightOperand, operator);
    }
  case '%':
    if (bothOfSameType(leftOperand, rightOperand, 'number')) {
      return leftOperand % rightOperand;
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

exports.checkCastingUnaryPrefix = (operand, operator) => {
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

exports.checkCastingUnaryPostfix = (originalOperand, operand, operator) => {
  if (typeof originalOperand !== 'number') {
    throw new ImplicitCastingException(originalOperand, undefined, operator);
  }

  return originalOperand; // postfix operators return original value and then
                          // incremnet/decrement it
};
