function NonExistingPropertyException(object, property) {
  let keyString = JSON.stringify(Object.keys(object));
  return new Error(`Property ${property} not found in object with keys ${keyString}`);
};

const conditionalBind = (func) => {
  return (object, property) => {
    const toReturn = func(object, property);

    if (typeof toReturn === 'function') {
      const res = toReturn.bind(object);
      // bind creates new function with undefined prototype
      res.prototype = toReturn.prototype;
      return res;
    } else {
      return toReturn;
    }
  };
};

const safeGetItem = (object, property) => {
  if ((typeof object === 'number') || (object === undefined) ||
      (object === null)) {
    throw NonExistingPropertyException(object, property);
  } else if ((typeof object === 'string') && (property in String.prototype)) {
    return object[property];
  } else if (property in object) {
    return object[property];
  } else if (Symbol.for('safeGetAttr') in object) {
    return object[Symbol.for('safeGetAttr')](property);
  } else {
    throw NonExistingPropertyException(object, property);
  }
};

const safeGetAttr = (object, property) => {
  if ((typeof object === 'number') || (object === undefined) ||
      (object === null)) {
    throw NonExistingPropertyException(object, property);
  } else if (typeof object === 'string') {
    if ((property >= 0) && (property < object.length)) {
      return object[property];
    } else {
      throw NonExistingPropertyException(object, property);
    }
  } else if (('has' in object) && ('get' in object)) {
    // covers data structures with has/get resolution protocol, e.g. Immutable.js,
    // ES6 Maps and WeakMaps
    if (object.has(property)) {
      return object.get(property);
    } else {
      throw NonExistingPropertyException(object, property);
    }
  } else if (property in object) {
    return object[property];
  } else if (Symbol.for('safeGetAttr') in object) {
    return object[Symbol.for('safeGetAttr')](property);
  } else {
    throw NonExistingPropertyException(object, property);
  }
};

exports.__superstrictSafeGetItem__ = conditionalBind(safeGetItem);
exports.__superstrictSafeGetAttr__ = conditionalBind(safeGetAttr);
