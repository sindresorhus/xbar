import {expectAssignable, expectNotAssignable, expectType} from 'tsd';
import xbar, {type TopLevelOptions, separator, isDarkMode} from './index.js';

expectType<void>(
	xbar([
		{
			text: '❤',
			color: isDarkMode ? 'white' : 'red',
			dropdown: false,
		},
		separator,
		{
			text: 'Unicorns',
			color: '#ff79d7',
			submenu: [
				{
					text: ':tv: Video',
					href: 'https://www.youtube.com/watch?v=9auOCbH5Ns4',
				},
				{
					text: ':book: Wiki',
					href: 'https://en.wikipedia.org/wiki/Unicorn',
				},
			],
		},
		separator,
		'Ponies',
	]),
);

expectType<boolean>(isDarkMode);

expectNotAssignable<TopLevelOptions>({text: 'Unicorns'});

expectAssignable<TopLevelOptions>({font: 'Comic Sans MS'});
