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
			href: 'https://www.youtube.com/watch?v=9auOCbH5Ns4'
		},
		m.sep,
		'Ponies'
	]);

	const expected = `
❤|color="red" dropdown="false"
Unicorns|color="#ff79d7" href="https://www.youtube.com/watch?v=9auOCbH5Ns4"
---
Ponies|
`.trim();

	t.is(actual, expected);
});
