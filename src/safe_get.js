function NonExistingPropertyException(object, property) {
  this.object = object;
  this.property = property;

  this.toString = () => {
    return `Property '${this.property}' is not found in object '${JSON.stringify(this.object)}'.`;
  };
};

exports.safeGetItem = (object, property) => {
  if (!(property in object)) {
    throw new NonExistingPropertyException(object, property);
  } else {
    return object[property];
  }
};

exports.safeGetAttr = exports.safeGetItem;
