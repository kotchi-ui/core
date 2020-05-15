import _isNull from "lodash/isNull";
import _isUndefined from "lodash/isUndefined";

export default function isFalseAttribute(str) {
  return str === false || _isNull(str) || _isUndefined(str);
}
