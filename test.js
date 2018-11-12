import test from 'ava';
import bitbar from '.';

test('main', t => {
	const actual = bitbar.create([
		{
			text: '❤',
			color: 'red',
			dropdown: false
		},
		bitbar.sep,
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
				bitbar.sep,
				{
					text: '1st Level Submenu - C'
				}
			]
		},
		bitbar.sep,
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
