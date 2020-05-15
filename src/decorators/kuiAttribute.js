import _kebabCase from "lodash/kebabCase";
import _isUndefined from "lodash/isUndefined";
import {
  defaultPropertySetter,
  defaultPropertyGetter,
} from "../utils/customElementUtils";
import {
  addObservedAttribute,
  setAttributeDefault,
  validateAttributeValue,
} from "../utils/customElementData";

export default function kuiAttribute(targetOrData, name, descriptor) {
  if (_isUndefined(descriptor) && _isUndefined(name)) {
    return descriptorFn.bind(this, targetOrData);
  } else {
    return descriptorFn({}, targetOrData, name, descriptor);
  }
}

function descriptorFn(
  { setter = defaultPropertySetter, getter = defaultPropertyGetter } = {},
  target,
  propertyName,
  descriptor
) {
  const tagName = target.getTagName();
  const attribute = _kebabCase(propertyName);
  const defaultValue = descriptor.initializer ? descriptor.initializer() : null;
  addObservedAttribute({ tagName, attribute });
  setAttributeDefault({ tagName, attribute, defaultValue });

  return {
    enumerable: true,
    configurable: true,
    set(value) {
      // logger.info(`Setting ${value} to ${propertyName}`);
      if (validateAttributeValue({ tagName, attribute, value })) {
        setter.call(this, { component: this, attribute, value });
      }
    },
    get() {
      // logger.info(`Getting value of ${propertyName}`);
      return getter.call(this, {
        component: this,
        attribute,
        defaultValue,
      });
    },
  };
}
/**
 *
 * Note:
 * There are two types of descriptors,
 *  accessor property descriptor - getter, setter, enumerable and configurable
 * data property descriptor - value, writable: true, enumerable, configurable
 * So descriptor can either have getter/setter OR value/writeable but not both!
 *
 */
