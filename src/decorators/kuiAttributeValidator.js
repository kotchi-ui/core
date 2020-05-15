import _kebabCase from "lodash/kebabCase";
import { setAttributeValidators } from "../utils/customElementData";

export default function kuiAttributeValidator(validators = []) {
  return function (target, propertyName, descriptor) {
    const tagName = target.getTagName();
    const attribute = _kebabCase(propertyName);
    setAttributeValidators({ tagName, attribute, validators });
    return descriptor;
  };
}
