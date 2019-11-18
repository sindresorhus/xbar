import {expectType} from 'tsd';
import bitbar = require('.');

expectType<void>(
	bitbar([
		{
			text: '❤',
			color: bitbar.darkMode ? 'white' : 'red',
			dropdown: false
		},
		bitbar.separator,
		{
			text: 'Unicorns',
			color: '#ff79d7',
			submenu: [
				{
					text: ':tv: Video',
					href: 'https://www.youtube.com/watch?v=9auOCbH5Ns4'
				},
				{
					text: ':book: Wiki',
					href: 'https://en.wikipedia.org/wiki/Unicorn'
				}
			]
		},
		bitbar.separator,
		'Ponies'
	])
);

expectType<boolean>(bitbar.darkMode);
