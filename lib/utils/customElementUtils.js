"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPropertyGetter = defaultPropertyGetter;
exports.defaultPropertySetter = defaultPropertySetter;
exports.booleanSetter = booleanSetter;
exports.booleanGetter = booleanGetter;
exports.useShadowDom = useShadowDom;
exports.getSlotNodes = getSlotNodes;
exports.getSlotNodesTags = getSlotNodesTags;
exports.validateChildren = validateChildren;
exports.registerChildren = registerChildren;
exports.updateElementCssClass = updateElementCssClass;

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _validators = require("../validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function defaultPropertyGetter(_ref) {
  var component = _ref.component,
      attribute = _ref.attribute;
  return component.getAttribute(attribute);
}

function defaultPropertySetter(_ref2) {
  var component = _ref2.component,
      attribute = _ref2.attribute,
      value = _ref2.value;

  if ((0, _isNull2["default"])(value) || (0, _isUndefined2["default"])(value)) {
    component.removeAttribute(attribute);
  } else {
    component.setAttribute(attribute, value);
  }
}

function booleanSetter(_ref3) {
  var component = _ref3.component,
      attribute = _ref3.attribute,
      value = _ref3.value;
  (0, _validators.isTrueAttribute)(value) ? component.setAttribute(attribute, "") : component.removeAttribute(attribute);
}

function booleanGetter(_ref4) {
  var component = _ref4.component,
      attribute = _ref4.attribute;
  return component.hasAttribute(attribute);
}

function useShadowDom(_ref5) {
  var host = _ref5.host,
      template = _ref5.template,
      _ref5$mode = _ref5.mode,
      mode = _ref5$mode === void 0 ? "open" : _ref5$mode;
  window.ShadyCSS && window.ShadyCSS.styleElement(this);
  host.attachShadow({
    mode: mode
  });
  host.shadowRoot.appendChild(template.content.cloneNode(true));
}

function getSlotNodes(slot) {
  if (slot && slot.tagName.toLowerCase() === "slot") return !slot.assignedNodes ? [] : slot.assignedNodes().filter(function (node) {
    return node.nodeType === 1;
  }); //Only element nodes are relavant

  return [];
}

function getSlotNodesTags(slot) {
  if (slot && slot.tagName.toLowerCase() === "slot") {
    var arr = getSlotNodes(slot).map(function (node) {
      return node.tagName.toLowerCase();
    });
    return _toConsumableArray(new Set(arr));
  }

  return [];
}

function validateChildren(_ref6) {
  var element = _ref6.element,
      allowedChildren = _ref6.allowedChildren,
      tagName = _ref6.tagName;
  var children = getSlotNodes(element);
  var typesToLowerCase = children.map(function (node) {
    return node.tagName.toLowerCase();
  });
  var kuiTypesOnly = typesToLowerCase.filter(function (type) {
    return type.startsWith("kui-");
  });

  var childrenTypes = _toConsumableArray(new Set(kuiTypesOnly));

  var notAllowedChildren = childrenTypes.filter(function (type) {
    return allowedChildren.indexOf(type) === -1;
  });

  if (notAllowedChildren.length > 0) {
    throw new Error("".concat(notAllowedChildren.join(", "), " can't be children of ").concat(tagName));
  }

  return {
    children: children,
    childrenTypes: childrenTypes
  };
}

function registerChildren(_ref7) {
  var _ref7$childrenTypes = _ref7.childrenTypes,
      childrenTypes = _ref7$childrenTypes === void 0 ? [] : _ref7$childrenTypes,
      _ref7$children = _ref7.children,
      children = _ref7$children === void 0 ? [] : _ref7$children,
      _ref7$definedCallback = _ref7.definedCallback,
      definedCallback = _ref7$definedCallback === void 0 ? function () {} : _ref7$definedCallback;

  if (childrenTypes.length > 0) {
    var whenDefinedPromises = [];

    for (var i = 0; i < childrenTypes.length; i++) {
      whenDefinedPromises.push(customElements.whenDefined(childrenTypes[i]));
    }

    Promise.all(whenDefinedPromises).then(function () {
      return definedCallback(children);
    });
  }
}

function updateElementCssClass(_ref8) {
  var oldValue = _ref8.oldValue,
      newValue = _ref8.newValue,
      element = _ref8.element,
      defaultValue = _ref8.defaultValue;
  var classList = element.classList;

  if (newValue) {
    if (oldValue) {
      classList.remove.apply(classList, oldValue.split(" "));
    }

    classList.add.apply(classList, newValue.split(" "));
  } else if (oldValue) {
    classList.remove.apply(classList, oldValue.split(" "));
    if (defaultValue) classList.add.apply(classList, defaultValue.split(" "));
  }
}