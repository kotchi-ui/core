"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = kuiAttribute;

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _customElementUtils = require("../utils/customElementUtils");

var _customElementData = require("../utils/customElementData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function kuiAttribute(targetOrData, name, descriptor) {
  if ((0, _isUndefined2["default"])(descriptor) && (0, _isUndefined2["default"])(name)) {
    return descriptorFn.bind(this, targetOrData);
  } else {
    return descriptorFn({}, targetOrData, name, descriptor);
  }
}

function descriptorFn() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$setter = _ref.setter,
      setter = _ref$setter === void 0 ? _customElementUtils.defaultPropertySetter : _ref$setter,
      _ref$getter = _ref.getter,
      getter = _ref$getter === void 0 ? _customElementUtils.defaultPropertyGetter : _ref$getter;

  var target = arguments.length > 1 ? arguments[1] : undefined;
  var propertyName = arguments.length > 2 ? arguments[2] : undefined;
  var descriptor = arguments.length > 3 ? arguments[3] : undefined;
  var tagName = target.getTagName();
  var attribute = (0, _kebabCase2["default"])(propertyName);
  var defaultValue = descriptor.initializer ? descriptor.initializer() : null;
  (0, _customElementData.addObservedAttribute)({
    tagName: tagName,
    attribute: attribute
  });
  (0, _customElementData.setAttributeDefault)({
    tagName: tagName,
    attribute: attribute,
    defaultValue: defaultValue
  });
  return {
    enumerable: true,
    configurable: true,
    set: function set(value) {
      // logger.info(`Setting ${value} to ${propertyName}`);
      if ((0, _customElementData.validateAttributeValue)({
        tagName: tagName,
        attribute: attribute,
        value: value
      })) {
        setter.call(this, {
          component: this,
          attribute: attribute,
          value: value
        });
      }
    },
    get: function get() {
      // logger.info(`Getting value of ${propertyName}`);
      return getter.call(this, {
        component: this,
        attribute: attribute,
        defaultValue: defaultValue
      });
    }
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