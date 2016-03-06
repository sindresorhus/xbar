'use strict';
var objectAssign = require('object-assign');
var sep = {};

function create(input, opts) {
	return input.map(function (line) {
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

		return text.split('\n').map(function (textLine) {
			return textLine + '|' + Object.keys(line).map(function (x) {
				if (x === 'href') {
					x = encodeURI(x);
				}

				return x + '="' + line[x] + '"';
			}).join(' ');
		}).join('\n');
	}).join('\n');
}

module.exports = function (input, opts) {
	console.log(create(input, opts));
};

module.exports.sep = sep;
module.exports.darkMode = process.env.BitBarDarkMode === '1';
module.exports.create = create;
