import _isString from "lodash/isString";

export default function isTrue(str) {
	return str === true || (!!str && _isString(str) && str.toLowerCase() === "true");
}
