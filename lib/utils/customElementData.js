"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAttributeValidators = setAttributeValidators;
exports.validateAttributeValue = validateAttributeValue;
exports.addObservedAttribute = addObservedAttribute;
exports.getObservedAttributes = getObservedAttributes;
exports.setAttributeDefault = setAttributeDefault;
exports.getAttributeDefault = getAttributeDefault;
var _data = {};

function setAttributeValidators(_ref) {
  var tagName = _ref.tagName,
      attribute = _ref.attribute,
      _ref$validators = _ref.validators,
      validators = _ref$validators === void 0 ? [] : _ref$validators;
  var attributeData = getAttributeData({
    tagName: tagName,
    attribute: attribute
  });
  attributeData.validators = validators;
}

function validateAttributeValue(_ref2) {
  var tagName = _ref2.tagName,
      attribute = _ref2.attribute,
      value = _ref2.value;

  var _getAttributeData = getAttributeData({
    tagName: tagName,
    attribute: attribute
  }),
      validators = _getAttributeData.validators; // logger.info(`${tagName} attributeValidator: ${attribute}=${value}`);


  var isValid = true;

  for (var i = 0; i < validators.length; i++) {
    if (!validators[i](value)) {
      // logger.error(`${attribute} does not accept ${value}`);
      isValid = false;
      break;
    }
  }

  return isValid;
}

function addObservedAttribute(_ref3) {
  var tagName = _ref3.tagName,
      attribute = _ref3.attribute;
  var customElementData = getCustomElementData({
    tagName: tagName
  });
  customElementData.observed.push(attribute);
}

function getObservedAttributes(_ref4) {
  var tagName = _ref4.tagName;
  var customElementData = getCustomElementData({
    tagName: tagName
  });
  var observed = customElementData.observed;
  return observed;
}

function setAttributeDefault(_ref5) {
  var tagName = _ref5.tagName,
      attribute = _ref5.attribute,
      defaultValue = _ref5.defaultValue;
  var attributeData = getAttributeData({
    tagName: tagName,
    attribute: attribute
  });
  attributeData.defaultValue = defaultValue;
}

function getAttributeDefault(_ref6) {
  var tagName = _ref6.tagName,
      attribute = _ref6.attribute;

  var _getAttributeData2 = getAttributeData({
    tagName: tagName,
    attribute: attribute
  }),
      defaultValue = _getAttributeData2.defaultValue;

  return defaultValue;
}

function getCustomElementData(_ref7) {
  var tagName = _ref7.tagName;

  if (!_data[tagName]) {
    _data[tagName] = {
      observed: []
    };
  }

  return _data[tagName];
}

function getAttributeData(_ref8) {
  var tagName = _ref8.tagName,
      attribute = _ref8.attribute;
  var customElementData = getCustomElementData({
    tagName: tagName
  });

  if (!customElementData[attribute]) {
    customElementData[attribute] = {
      validators: [],
      defaultValue: null
    };
  }

  return customElementData[attribute];
}