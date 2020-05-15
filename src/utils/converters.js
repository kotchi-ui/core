import _camelCase from "lodash/camelCase";
import _kebabCase from "lodash/kebabCase";

export function attributeToProperty(attribute) {
  return _camelCase(attribute);
}

export function propertyToAttribute(property) {
  return _kebabCase(property);
}
