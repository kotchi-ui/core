import _isNumber from "lodash/isNumber";
import _isString from "lodash/isString";
import _isNull from "lodash/isNull";
import { Types, isTrueAttribute, isFalseAttribute } from ".";

export default function typeValidator(allowedType) {
  return function (value) {
    let isValid = true;
    if (typeof allowedType === "string") {
      isValid = _isNull(value) || validatePremitiveType(allowedType, value);
    } else if (typeof allowedType === "object") {
      isValid = _isNull(value) || validateEnumType(allowedType, value);
    } else {
      // logger.error(`${allowedType} has no supported validator`);
      isValid = false;
    }
    return isValid;
  };
}

function validatePremitiveType(allowedType, value) {
  switch (allowedType) {
    case Types.Boolean:
      return isTrueAttribute(value) || isFalseAttribute(value);
    case Types.Number:
      return _isNumber(Number.parseInt(value));
    case Types.String:
      return _isString(value);
    default:
      // logger.error(`${allowedType} has no supported validator`);
      return false;
  }
}

function validateEnumType(allowedType, value) {
  return (
    Object.entries(allowedType).filter((pair) => pair[1] === value).length === 1
  );
}
