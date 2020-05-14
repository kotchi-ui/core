import _camelCase from "lodash/camelCase";
import _isFunction from "lodash/isFunction";
import _isUndefined from "lodash/isUndefined";
import _isNull from "lodash/isNull";
import { getObservedAttributes, getAttributeDefault } from "../utils/customElementData";
import { validateChildren, registerChildren } from "../utils/customElementUtils";

const definedElements = {};
export default function kuiCustomElement({ tagName, allowedChildren = [], allowedParents = [] }) {
	return function (ComponentClass) {
		class KUICustomElement extends ComponentClass {
			constructor(...args) {
				super(...args);
				this.__kuiChildren = findKUIChildren.call({}, this);
				this.__handlersQueue = [];
			}

			connectedCallback() {
				let callback = (children) => {
					this.__kuiChildrenReady = true;
					if (_isFunction(ComponentClass.prototype.connectedCallback)) {
						callback = ComponentClass.prototype.connectedCallback.call(this, children);
					}
					this.__handlersQueue.forEach((handler) => handler.call(this));
				};
				syncAttributes.call(this, tagName);
				handleChildren.call(this, { allowedChildren, tagName, callback });
				handleParents.call(this, { allowedParents, tagName });
			}

			attributeChangedCallback(attribute, oldValue, newValue) {
				const handler = `${_camelCase(attribute)}ChangeHandler`;
				if (this.__kuiChildrenReady) {
					// logger.info(`Calling ${handler}`);
					this[handler].call(this, {
						attribute,
						oldValue,
						newValue,
					});
				} else {
					// logger.info(`adding ${handler} to handlers queue till children are ready`);
					this.__handlersQueue.push(
						this[handler].bind(this, {
							attribute,
							oldValue,
							newValue,
						})
					);
				}
			}

			static get observedAttributes() {
				const attrs = getObservedAttributes({ tagName });
				// logger.info(`Observing [${attrs.join(", ")}] for ${tagName}`);
				return attrs;
			}
		}

		defineCustomElement.call(this, { tagName, KUICustomElement });

		return KUICustomElement;
	};
}

// searchs for all the kui-* elements under the container
function findKUIChildren(container) {
	const allNodes = [...container.shadowRoot.querySelectorAll("*")];
	const kuiNodes = allNodes.filter(function (el) {
		return el.tagName.toLowerCase().startsWith("kui-");
	});
	const types = [...new Set(kuiNodes.map((el) => el.tagName.toLowerCase()))];
	return { nodes: kuiNodes, types };
}

function syncAttributes(tagName) {
	const attributes = getObservedAttributes({ tagName });
	attributes.forEach((attr) => {
		const defaultValue = getAttributeDefault({ tagName, attribute: attr });
		if (this.getAttribute(attr) === null) {
			if (_isUndefined(defaultValue) || _isNull(defaultValue) || defaultValue === false) {
				this.attributeChangedCallback(attr, null, null);
			} else {
				this[_camelCase(attr)] = defaultValue;
			}
		}
	});
}

function handleParents({ tagName, allowedParents }) {
	if (allowedParents.length > 0) {
		// logger.info(tagName);
		// logger.info(allowedParents);
	}
}
function handleChildren({ tagName, allowedChildren, callback }) {
	let types = [...this.__kuiChildren.types];
	let nodes = [...this.__kuiChildren.nodes];
	if (allowedChildren.length > 0) {
		if (_isUndefined(this.elements.contentsContainer)) {
			throw new Error(`${tagName} class should have contentsContainer element`);
		}
		const { childrenTypes, children } = validateChildren({
			element: this.elements.contentsContainer,
			allowedChildren,
			tagName,
		});
		types = [...new Set([...types, ...childrenTypes])];
		nodes = [...new Set([...nodes, ...children])];
	}
	if (types.length > 0 && nodes.length > 0) {
		registerChildren({
			childrenTypes: types,
			children: nodes,
			definedCallback: callback,
		});
	} else {
		callback([]);
	}
}

function defineCustomElement({ tagName, KUICustomElement }) {
	// logger.info(`defining ${tagName} ... `);
	if (!definedElements[tagName]) {
		definedElements[tagName] = true;
		// logger.info(`Creating new instance of ${tagName} ... `);
		window.customElements.define(tagName, KUICustomElement);
		// logger.info(`${tagName} is now defined`);
	} else {
		// logger.info(`${tagName} is already defined`);
	}
}
