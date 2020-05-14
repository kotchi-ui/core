const _data = {};

export function setAttributeValidators({ tagName, attribute, validators = [] }) {
	const attributeData = getAttributeData({ tagName, attribute });
	attributeData.validators = validators;
}

export function validateAttributeValue({ tagName, attribute, value }) {
	const { validators } = getAttributeData({ tagName, attribute });
	// logger.info(`${tagName} attributeValidator: ${attribute}=${value}`);
	let isValid = true;
	for (let i = 0; i < validators.length; i++) {
		if (!validators[i](value)) {
			// logger.error(`${attribute} does not accept ${value}`);
			isValid = false;
			break;
		}
	}
	return isValid;
}

export function addObservedAttribute({ tagName, attribute }) {
	const customElementData = getCustomElementData({ tagName });
	customElementData.observed.push(attribute);
}

export function getObservedAttributes({ tagName }) {
	const customElementData = getCustomElementData({ tagName });
	const { observed } = customElementData;
	return observed;
}

export function setAttributeDefault({ tagName, attribute, defaultValue }) {
	const attributeData = getAttributeData({ tagName, attribute });
	attributeData.defaultValue = defaultValue;
}

export function getAttributeDefault({ tagName, attribute }) {
	const { defaultValue } = getAttributeData({ tagName, attribute });
	return defaultValue;
}

function getCustomElementData({ tagName }) {
	if (!_data[tagName]) {
		_data[tagName] = {
			observed: [],
		};
	}
	return _data[tagName];
}

function getAttributeData({ tagName, attribute }) {
	const customElementData = getCustomElementData({ tagName });
	if (!customElementData[attribute]) {
		customElementData[attribute] = {
			validators: [],
			defaultValue: null,
		};
	}
	return customElementData[attribute];
}
