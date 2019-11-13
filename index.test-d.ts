import {expectType} from 'tsd';
import bitbar = require('.');

expectType<void>(
	bitbar([
		{
			text: '❤',
			color: bitbar.darkMode ? 'white' : 'red',
			dropdown: false
		},
	]),
);

expectType<boolean>(bitbar.darkMode);
