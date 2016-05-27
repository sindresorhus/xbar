'use strict';
var objectAssign = require('object-assign');
var sep = {};

function create(input, opts, menuLevel) {
	menuLevel = menuLevel || 0;

	return input.map(function (line) {
		var submenuText = '';
		if (typeof line === 'string' || typeof line === 'number') {
			line = {text: line};
		}

		if (line === sep) {
			return '---';
		}

		line = objectAssign(line, opts);

		var text = String(line.text);
		delete line.text;

		if (!text) {
			throw new Error('text required');
		}

		if (typeof line.submenus === 'object' && line.submenus.length > 0) {
			submenuText = '\n' + create(line.submenus, opts, menuLevel + 1);
			delete line.submenus;
		}

		var prefix = '--'.repeat(menuLevel);

		return text.split('\n').map(function (textLine) {
			return prefix + textLine + '|' + Object.keys(line).map(function (x) {
				if (x === 'href') {
					x = encodeURI(x);
				}

				return x + '="' + line[x] + '"';
			}).join(' ');
		}).join('\n').concat(submenuText);
	}).join('\n');
}

module.exports = function (input, opts) {
	console.log(create(input, opts));
};

module.exports.sep = sep;
module.exports.darkMode = process.env.BitBarDarkMode === '1';
module.exports.create = create;
