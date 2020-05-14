import { isTrueAttribute } from "../validators";
import { updateElementCssClass } from "../utils/customElementUtils";
import changeHandlerHelper from "./changeHandlerHelper";

/**
 * A very basic style applier on the given element, adds/removes the className from the classList
 * Applies the newValue as the className or the given className parameter
 * Sets/Removes the given attributeName with the given attributeValue
 *
 * @param {String|Object} data
 */
export default function kuiStyleChangeHandler(data) {
	let { element = "", className = "", attributeName = "", attributeValue = "" } = {};
	if (typeof data === "string") {
		element = data;
	} else {
		element = data.element;
		className = data.className;
		attributeName = data.attributeName || "";
		attributeValue = data.attributeValue || "";
	}
	return function (target, name, descriptor) {
		const handler = descriptor.value;
		const styleHandler = function ({ attribute, oldValue, newValue, defaultValue }) {
			const el = this.elements[element];
			if (className) {
				if (isTrueAttribute(newValue)) {
					el.classList.add(className);
					if (attributeName) el.setAttribute(attributeName, attributeValue);
				} else {
					el.classList.remove(className);
					if (attributeName) el.removeAttribute(attributeName);
				}
			} else {
				updateElementCssClass({
					oldValue,
					newValue,
					element: el,
					defaultValue,
				});
			}
			handler.call(this, { attribute, oldValue, newValue, defaultValue });
		};
		descriptor.value = changeHandlerHelper(target, styleHandler);
		return descriptor;
	};
}
