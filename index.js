'use strict';
const sep = {};

function create(input, opts, menuLevel) {
	menuLevel = menuLevel || 0;

	return input.map((line) => {
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

		if (typeof line.submenus === 'object' && line.submenus.length > 0) {
			submenuText = `\n${create(line.submenus, opts, menuLevel + 1)}`;
			delete line.submenus;
		}

		const prefix = '--'.repeat(menuLevel);

		return text.split('\n').map((textLine) => {
			return `${prefix}${textLine}|${Object.keys(line).map((x) => {
				if (x === 'href') {
					x = encodeURI(x);
				}

				return `${x}="${line[x]}"`;
			}).join(' ')}`;
		}).join('\n').concat(submenuText);
	}).join('\n');
}

module.exports = (input, opts) => {
	console.log(create(input, opts));
};

module.exports.sep = sep;
module.exports.darkMode = process.env.BitBarDarkMode === '1';
module.exports.create = create;
