import test from 'ava';
import m from './';

test(t => {
	const actual = m.create([
		{
			text: '❤',
			color: 'red',
			dropdown: false
		},
		{
			text: 'Unicorns',
			color: '#ff79d7',
			href: 'https://www.youtube.com/watch?v=9auOCbH5Ns4',
			submenus: [
				{
					text: '1st Level Submenu - A',
					submenus: [
						{
							text: '2nd level Submenu'
						}
					]
				},
				{
					text: '1st Level Submenu - B'
				}
			]
		},
		m.sep,
		'Ponies'
	]);

	const expected = `
❤|color="red" dropdown="false"
Unicorns|color="#ff79d7" href="https://www.youtube.com/watch?v=9auOCbH5Ns4"
--1st Level Submenu - A|
----2nd level Submenu|
--1st Level Submenu - B|
---
Ponies|
`.trim();

	t.is(actual, expected);
});
