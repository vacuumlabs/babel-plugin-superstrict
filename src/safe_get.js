function NonExistingPropertyException(object, property) {
  this.object = object;
  this.property = property;

  this.toString = () => {
    return `Property '${this.property}' is not found in object '${JSON.stringify(this.object)}'.`;
  };
};

const conditionalBind = (func) => {
  return (object, property) => {
    const toReturn = func(object, property);

    if (typeof toReturn === 'function') {
      return toReturn.bind(object);
    } else {
      return toReturn;
    }
  };
};

const safeGetItem = (object, property) => {
  if (property in object) {
    return object[property];
  } else if (Symbol.for('safeGetAttr') in object) {
    return object[Symbol.for('safeGetAttr')](property);
  } else {
    throw new NonExistingPropertyException(object, property);
  }
};

const safeGetAttr = (object, property) => {
  // covers data structures with has/get resolution protocol, e.g. Immutable.js,
  // ES6 Maps and WeakMaps
  if (('has' in object) && ('get' in object)) {
    if (object.has(property)) {
      return object.get(property);
    } else {
      throw new NonExistingPropertyException(object, property);
    }
  } else if (property in object) {
    return object[property];
  } else if (Symbol.for('safeGetAttr') in object) {
    return object[Symbol.for('safeGetAttr')](property);
  } else {
    throw new NonExistingPropertyException(object, property);
  }
};

exports.safeGetItem = conditionalBind(safeGetItem);
exports.safeGetAttr = conditionalBind(safeGetAttr);
