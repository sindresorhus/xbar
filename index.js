import process from 'node:process';

export const separator = Symbol('separator');

export const isDarkMode = process.env.XBARDarkMode === '1';

const encodeHref = url => {
	url = encodeURI(url);
	url = url.replace(/'/g, '%27');
	url = url.replace(/&/g, '%26');
	return url;
};

export const _create = (input, options = {}, menuLevel = 0) => {
	if (typeof options.text !== 'undefined') {
		throw new TypeError('The `text` option is not supported as a top-level option. Use it on an item instead.');
	}

	return input.map(line => {
		if (typeof line === 'string') {
			line = {text: line};
		}

		if (line === separator) {
			return '--'.repeat(menuLevel) + '---';
		}

		line = {
			...options,
			...line,
		};

		const {text} = line;
		if (typeof text !== 'string') {
			throw new TypeError('The `text` property is required and should be a string');
		}

		delete line.text;

		let submenuText = '';
		if (typeof line.submenu === 'object' && line.submenu.length > 0) {
			submenuText = `\n${_create(line.submenu, options, menuLevel + 1)}`;
			delete line.submenu;
		}

		const prefix = '--'.repeat(menuLevel);

		return text.split('\n').map(textLine => {
			const options = Object.entries(line).map(([key, value]) => {
				const finalValue = key === 'href' ? encodeHref(value) : value;
				return `${key}="${finalValue}"`;
			}).join(' ');

			return `${prefix}${textLine}|${options}`;
		}).join('\n') + submenuText;
	}).join('\n');
};

export default function xbar(input, options) {
	console.log(_create(input, options));
}
