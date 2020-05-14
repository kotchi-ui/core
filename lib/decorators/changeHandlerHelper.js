"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _customElementData = require("../utils/customElementData");

function _default(target, originalMethod) {
  return function (_ref) {
    var attribute = _ref.attribute,
        oldValue = _ref.oldValue,
        newValue = _ref.newValue;
    var tagName = target.getTagName();

    if ((0, _customElementData.validateAttributeValue)({
      tagName: tagName,
      attribute: attribute,
      value: newValue
    })) {
      var defaultValue = (0, _customElementData.getAttributeDefault)({
        tagName: tagName,
        attribute: attribute
      });
      originalMethod.call(this, {
        attribute: attribute,
        oldValue: oldValue,
        newValue: newValue,
        defaultValue: defaultValue
      });
    } else {
      // logger.info("Rolling back to previous value");
      if (oldValue === null) this.removeAttribute(attribute);else this.setAttribute(attribute, oldValue);
    }
  };
}