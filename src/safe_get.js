function NonExistingPropertyException(object, property) {
  this.object = object;
  this.property = property;

  this.toString = () => {
    return `Property '${this.property}' is not found in object '${JSON.stringify(this.object)}'.`;
  };
};

exports.safeGetItem = (object, property) => {
  let toReturn;

  if (property in object) {
    toReturn = object[property];
  } else if (Symbol.for('safeGetAttr') in object) {
    toReturn = object[Symbol.for('safeGetAttr')](property);
  } else {
    throw new NonExistingPropertyException(object, property);
  }

  if (typeof toReturn === 'function') {
    return toReturn.bind(object);
  } else {
    return toReturn;
  }
};

exports.safeGetAttr = exports.safeGetItem;

exports.safeGetImmutableJs = (object, property) => {
  if (object.has(property)) {
    let toReturn = object.get(property);

    if (typeof toReturn === 'function') {
      return toReturn.bind(object);
    } else {
      return toReturn;
    }
  } else {
    throw new NonExistingPropertyException(object, property);
  }
};

exports.safeGetInImmutableJs = (object, property) => {
  if (object.hasIn(property)) {
    let toReturn = object.getIn(property);

    if (typeof toReturn === 'function') {
      return toReturn.bind(object);
    } else {
      return toReturn;
    }
  } else {
    throw new NonExistingPropertyException(object, property);
  }
};
