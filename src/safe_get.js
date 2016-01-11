function NonExistingPropertyException(object, property) {
  this.object = object;
  this.property = property;

  this.toString = () => {
    return `Property '${this.property}' is not found in object '${JSON.stringify(this.object)}'.`;
  };
};

module.exports = () => {
  Object.prototype[Symbol.for('safeGetItem')] = function(property) {
    if (!(property in this)) {
      throw new NonExistingPropertyException(this, property);
    }
  };

  Object.prototype[Symbol.for('safeGetAttr')] = Object[Symbol.for('safeGetItem')];
};
