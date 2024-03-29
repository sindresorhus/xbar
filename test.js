import test from 'ava';
import xbar, {_create, separator} from './index.js';

test('main', t => {
	const actual = _create([
		{
			text: '❤',
			color: 'red',
			dropdown: false,
		},
		separator,
		{
			text: 'Unicorns',
			color: '#ff79d7',
			href: 'https://www.youtube.com/watch?v=9auOCbH5Ns4',
			submenu: [
				{
					text: '1st Level Submenu - A',
					submenu: [
						{
							text: '2nd level Submenu',
						},
					],
				},
				{
					text: '1st Level Submenu - B',
				},
				separator,
				{
					text: '1st Level Submenu - C',
				},
			],
		},
		separator,
		'Ponies',
	]);

	const expected = `
❤|color="red" dropdown="false"
---
Unicorns|color="#ff79d7" href="https://www.youtube.com/watch?v=9auOCbH5Ns4"
--1st Level Submenu - A|
----2nd level Submenu|
--1st Level Submenu - B|
-----
--1st Level Submenu - C|
---
Ponies|
`.trim();

	t.is(actual, expected);
});

test('`text` property validation', t => {
	const errorMessage = 'The `text` property is required and should be a string';

	t.throws(() => {
		xbar([{dropdown: false}]);
	}, {message: errorMessage});

	t.throws(() => {
		xbar([{text: 1}]);
	}, {message: errorMessage});
});

test('correctly encodes special characters in the `href` option', t => {
	const actual = _create([
		{
			text: 'Single Quote',
			href: 'https://www.youtube.com/watch?v=\'9auOCbH5Ns4',
		},
		{
			text: 'Double Quotes',
			href: 'https://www.youtube.com/watch?v="9auOCbH5Ns4"',
		},
		{
			text: 'Ampercent',
			href: 'https://www.youtube.com/watch?v=&9auOCbH5Ns4',
		},
	]);
	const expected = `
Single Quote|href="https://www.youtube.com/watch?v=%279auOCbH5Ns4"
Double Quotes|href="https://www.youtube.com/watch?v=%229auOCbH5Ns4%22"
Ampercent|href="https://www.youtube.com/watch?v=%269auOCbH5Ns4"
`.trim();

	t.is(actual, expected);
});

test('item options overrides top-level options', t => {
	const actual = _create([
		{
			text: 'Default font',
		},
		{
			text: 'Overriden font',
			font: 'Comic Sans MS',
		},
	], {
		font: 'Arial',
	});

	const expected = `
Default font|font="Arial"
Overriden font|font="Comic Sans MS"
`.trim();

	t.is(actual, expected);
});

test('`text` property on top-level options throws TypeError', t => {
	const errorMessage = 'The `text` option is not supported as a top-level option. Use it on an item instead.';

	t.throws(() => {
		xbar([
			{
				text: '❤',
			},
		], {
			text: 'Override',
		});
	}, {message: errorMessage});
});
