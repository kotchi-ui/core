import _isString from "lodash/isString";

export default function isFalse(str) {
  return (
    str === false || (!!str && _isString(str) && str.toLowerCase() === "false")
  );
}
