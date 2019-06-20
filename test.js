import test from 'ava';
import bitbar from '.';

test('main', t => {
	const actual = bitbar.create([
		{
			text: '❤',
			color: 'red',
			dropdown: false
		},
		bitbar.separator,
		{
			text: 'Unicorns',
			color: '#ff79d7',
			href: 'https://www.youtube.com/watch?v=9auOCbH5Ns4',
			submenu: [
				{
					text: '1st Level Submenu - A',
					submenu: [
						{
							text: '2nd level Submenu'
						}
					]
				},
				{
					text: '1st Level Submenu - B'
				},
				bitbar.separator,
				{
					text: '1st Level Submenu - C'
				}
			]
		},
		bitbar.separator,
		'Ponies'
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
		bitbar([{dropdown: false}]);
	}, errorMessage);

	t.throws(() => {
		bitbar([{text: 1}]);
	}, errorMessage);
});

test('correctly encodes special characters in the `href` option', t => {
	const actual = bitbar.create([
		{
			text: 'Single Quote',
			href: 'https://www.youtube.com/watch?v=\'9auOCbH5Ns4'
		},
		{
			text: 'Double Quotes',
			href: 'https://www.youtube.com/watch?v="9auOCbH5Ns4"'
		},
		{
			text: 'Ampercent',
			href: 'https://www.youtube.com/watch?v=&9auOCbH5Ns4'
		}
	]);
	const expected = `
Single Quote|href="https://www.youtube.com/watch?v=%279auOCbH5Ns4"
Double Quotes|href="https://www.youtube.com/watch?v=%229auOCbH5Ns4%22"
Ampercent|href="https://www.youtube.com/watch?v=%269auOCbH5Ns4"
`.trim();

	t.is(actual, expected);
});
