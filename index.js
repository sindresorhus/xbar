'use strict';
const sep = {};
const create = (input, opts, menuLevel = 0) => input.map(line => {
	let submenuText = '';
	if (typeof line === 'string' || typeof line === 'number') {
		line = {text: line};
	}

	if (line === sep) {
		return '---';
	}

	line = Object.assign(line, opts);

	const text = String(line.text);
	delete line.text;

	if (!text) {
		throw new Error('text required');
	}

	if (typeof line.submenu === 'object' && line.submenu.length > 0) {
		submenuText = `\n${create(line.submenu, opts, menuLevel + 1)}`;
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

module.exports = (input, opts) => {
	console.log(create(input, opts));
};

module.exports.sep = sep;
module.exports.darkMode = process.env.BitBarDarkMode === '1';
module.exports.create = create;
