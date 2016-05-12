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
  if (typeof object === 'string') {
    if ((property >= 0) && (property < object.length)) {
      return object[property];
    } else {
      throw new NonExistingPropertyException(object, property);
    }
  } else if (('has' in object) && ('get' in object)) {
    // covers data structures with has/get resolution protocol, e.g. Immutable.js,
    // ES6 Maps and WeakMaps
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

exports.checkIn = (object, property) => {
  if (typeof object === 'string') {
    return object.includes(property); // substring?
  } else if (Array.isArray(object)) {
    return object.indexOf(property) !== -1;
  } else if ('has' in object) {
    return object.has(property);
  } else {
    return property in object;
  }
};

exports.safeGetItem = conditionalBind(safeGetItem);
exports.safeGetAttr = conditionalBind(safeGetAttr);
