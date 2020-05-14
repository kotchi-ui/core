import _isNull from "lodash/isNull";
import _isUndefined from "lodash/isUndefined";

import { isTrueAttribute } from "../validators";

export function defaultPropertyGetter({ component, attribute }) {
	return component.getAttribute(attribute);
}

export function defaultPropertySetter({ component, attribute, value }) {
	if (_isNull(value) || _isUndefined(value)) {
		component.removeAttribute(attribute);
	} else {
		component.setAttribute(attribute, value);
	}
}

export function booleanSetter({ component, attribute, value }) {
	isTrueAttribute(value) ? component.setAttribute(attribute, "") : component.removeAttribute(attribute);
}

export function booleanGetter({ component, attribute }) {
	return component.hasAttribute(attribute);
}

export function useShadowDom({ host, template, mode = "open" }) {
	window.ShadyCSS && window.ShadyCSS.styleElement(this);
	host.attachShadow({ mode });
	host.shadowRoot.appendChild(template.content.cloneNode(true));
}

export function getSlotNodes(slot) {
	if (slot && slot.tagName.toLowerCase() === "slot")
		return !slot.assignedNodes ? [] : slot.assignedNodes().filter((node) => node.nodeType === 1); //Only element nodes are relavant
	return [];
}

export function getSlotNodesTags(slot) {
	if (slot && slot.tagName.toLowerCase() === "slot") {
		const arr = getSlotNodes(slot).map((node) => node.tagName.toLowerCase());
		return [...new Set(arr)];
	}
	return [];
}

export function validateChildren({ element, allowedChildren, tagName }) {
	const children = getSlotNodes(element);
	const typesToLowerCase = children.map((node) => node.tagName.toLowerCase());
	const kuiTypesOnly = typesToLowerCase.filter((type) => type.startsWith("kui-"));
	const childrenTypes = [...new Set(kuiTypesOnly)];
	const notAllowedChildren = childrenTypes.filter((type) => allowedChildren.indexOf(type) === -1);
	if (notAllowedChildren.length > 0) {
		throw new Error(`${notAllowedChildren.join(", ")} can't be children of ${tagName}`);
	}
	return { children, childrenTypes };
}

export function registerChildren({ childrenTypes = [], children = [], definedCallback = () => {} }) {
	if (childrenTypes.length > 0) {
		const whenDefinedPromises = [];
		for (let i = 0; i < childrenTypes.length; i++) {
			whenDefinedPromises.push(customElements.whenDefined(childrenTypes[i]));
		}
		Promise.all(whenDefinedPromises).then(() => definedCallback(children));
	}
}

export function updateElementCssClass({ oldValue, newValue, element, defaultValue }) {
	const { classList } = element;
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
