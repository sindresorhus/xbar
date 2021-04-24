declare namespace bitbar {
	interface BitbarOptions {
		/**
		The text to show. The only required property.
		*/
		text: string;

		/**
		The URL that will be opened when the menu item is clicked.
		*/
		href?: string;

		/**
		Change the text color.
		*/
		color?: string;

		/**
		Change the text font.
		*/
		font?: string;

		/**
		Change the text size.
		*/
		size?: number;

		/**
		Run a script.
		*/
		bash?: string;

		/**
		Parameters to specify as arguments for the script, specified in `bash`. There are up to 5 parameters available in BitBar.
		*/
		param1?: string;
		param2?: string;
		param3?: string;
		param4?: string;
		param5?: string;

		/**
		Start the script with Terminal.
		*/
		terminal?: boolean;

		/**
		Refresh the plugin.
		*/
		refresh?: boolean;

		/**
		Show the item in the dropdown.
		*/
		dropdown?: boolean;

		/**
		Truncate the line to the specified number of characters.
		*/
		length?: number;

		/**
		Trim the leading and trailing whitespace from the text.
		*/
		trim?: boolean;

		/**
		Mark the line as an alternate to the previous line, for when the Option key is pressed, in the dropdown.
		*/
		alternate?: boolean;

		/**
		Set an image for the item. It must be a Base64 encoded string.
		*/
		templateImage?: string;

		/**
		Set an image for this item. It must be a base64 encoded string.
		*/
		image?: string;

		/**
		Convert text to emojis, such as `:mushroom:`.
		*/
		emojize?: boolean;

		/**
		Enable parsing of ANSI codes.
		*/
		ansi?: boolean;
	}

	export interface Options extends BitbarOptions {
		/**
		Add a submenu to the item. A submenu is composed of an array of items.
		*/
		submenu?: (string | Options | typeof separator)[];
	}

	export type TopLevelOptions = Omit<Options, 'text'>

	/**
	Add a separator.
	*/
	export const separator: unique symbol;

	/**
	Check whether dark mode is enabled.
	*/
	export const darkMode: boolean;
}

/**
Create a plugin for BitBar.

@param items - BitBar items.
@param options - Options for all BitBar items.

@example
```
#!/usr/bin/env /usr/local/bin/node
import bitbar = require('bitbar');

bitbar([
	{
		text: '❤',
		color: bitbar.darkMode ? 'white' : 'red',
		dropdown: false,
	},
]);
```
*/
declare function bitbar(
	items: readonly (string | bitbar.Options | typeof bitbar.separator)[],
	options?: bitbar.TopLevelOptions
): void;

export = bitbar;
