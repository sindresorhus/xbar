interface BitbarOptions {
	/**
	The text to show. The only required property.
	*/
	readonly text: string;

	/**
	The URL that will be opened when the menu item is clicked.
	*/
	readonly href?: string;

	/**
	Change the text color.
	*/
	readonly color?: string;

	/**
	Change the text font.
	*/
	readonly font?: string;

	/**
	Change the text size.
	*/
	readonly size?: number;

	/**
	Run a script.
	*/
	readonly bash?: string;

	/**
	Parameters to specify as arguments for the script, specified in `bash`. There are up to 5 parameters available in BitBar.
	*/
	readonly param1?: string;

	/**
	Parameters to specify as arguments for the script, specified in `bash`. There are up to 5 parameters available in BitBar.
	*/
	readonly param2?: string;

	/**
	Parameters to specify as arguments for the script, specified in `bash`. There are up to 5 parameters available in BitBar.
	*/
	readonly param3?: string;

	/**
	Parameters to specify as arguments for the script, specified in `bash`. There are up to 5 parameters available in BitBar.
	*/
	readonly param4?: string;

	/**
	Parameters to specify as arguments for the script, specified in `bash`. There are up to 5 parameters available in BitBar.
	*/
	readonly param5?: string;

	/**
	Start the script with Terminal.
	*/
	readonly terminal?: boolean;

	/**
	Refresh the plugin.
	*/
	readonly refresh?: boolean;

	/**
	Show the item in the dropdown.
	*/
	readonly dropdown?: boolean;

	/**
	Truncate the line to the specified number of characters.
	*/
	readonly length?: number;

	/**
	Trim the leading and trailing whitespace from the text.
	*/
	readonly trim?: boolean;

	/**
	Mark the line as an alternate to the previous line, for when the Option key is pressed, in the dropdown.
	*/
	readonly alternate?: boolean;

	/**
	Set an image for the item. It must be a Base64 encoded string.
	*/
	readonly templateImage?: string;

	/**
	Set an image for this item. It must be a base64 encoded string.
	*/
	readonly image?: string;

	/**
	Convert text to emojis, such as `:mushroom:`.
	*/
	readonly emojize?: boolean;

	/**
	Enable parsing of ANSI codes.
	*/
	readonly ansi?: boolean;
}

export interface Options extends BitbarOptions {
	/**
	Add a submenu to the item. A submenu is composed of an array of items.
	*/
	readonly submenu?: Array<string | Options | typeof separator>;
}

export type TopLevelOptions = Omit<Options, 'text'>; // eslint-disable-line @typescript-eslint/ban-types

/**
Add a separator.
*/
export const separator: unique symbol;

/**
Check whether dark mode is enabled.
*/
export const isDarkMode: boolean;

/**
Create a plugin for BitBar.

@param items - BitBar items.
@param options - Options for all BitBar items.

@example
```
#!/usr/bin/env node --input-type=module
import bitbar, {separator, isDarkMode} from 'bitbar';

bitbar([
	{
		text: '❤',
		color: isDarkMode ? 'white' : 'red',
		dropdown: false
	},
	separator,
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
	separator,
	'Ponies'
]);
```
*/
export default function bitbar(
	items: ReadonlyArray<string | Options | typeof separator>,
	options?: TopLevelOptions
): void;
