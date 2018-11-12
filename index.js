'use strict';

const separator = Symbol('separator');

const create = (input, options, menuLevel = 0) => input.map(line => {
	let submenuText = '';

	if (typeof line === 'string' || typeof line === 'number') {
		line = {text: line};
	}

	if (line === separator) {
		return '--'.repeat(menuLevel) + '---';
	}

	line = Object.assign(line, options);

	const text = String(line.text);
	delete line.text;

	if (!text) {
		throw new Error('text required');
	}

	if (typeof line.submenu === 'object' && line.submenu.length > 0) {
		submenuText = `\n${create(line.submenu, options, menuLevel + 1)}`;
		delete line.submenu;
	}

	const prefix = '--'.repeat(menuLevel);

	return text.split('\n').map(textLine => {
		const options = Object.keys(line).map(key => {
			const value = key === 'href' ? encodeURI(line[key]) : line[key];
			return `${key}="${value}"`;
		}).join(' ');

		return `${prefix}${textLine}|${options}`;
	}).join('\n').concat(submenuText);
}).join('\n');

module.exports = (input, options) => {
	console.log(create(input, options));
};

module.exports.sep = separator;
module.exports.darkMode = process.env.BitBarDarkMode === '1';
module.exports.create = create;
