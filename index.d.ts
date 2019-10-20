declare namespace bitbar {
	// Options for the original BitBar program, taken from here:
	// https://github.com/matryer/bitbar#plugin-api
	interface BitbarOptions {
		/**
		 * The text to show. The only required property.
		 */
		text: string;

		/**
		 * Make the item clickable.
		 */
		href?: string;

		/**
		 * Change the text color.
		 */
		color?: string;

		/**
		 * Change the text font.
		 */
		font?: string;

		/**
		 * Change the text size.
		 */
		size?: number;

		/**
		 * Run a script.
		 */
		bash?: string;

		/**
		 * Params to specify as arguments for the script, specified in `bash`. There
		 * are up to 5 params available in BitBar.
		 */
		param1?: string;
		param2?: string;
		param3?: string;
		param4?: string;
		param5?: string;

		/**
		 * Start the script with Terminal.
		 */
		terminal?: boolean;

		/**
		 * Refresh the plugin.
		 */
		refresh?: boolean;

		/**
		 * Show the item in the dropdown.
		 */
		dropdown?: boolean;

		/**
		 * Truncate the line to the specified number of characters.
		 */
		length?: number;

		/**
		 * Trim the leading and trailing whitespace from the text.
		 */
		trim?: boolean;

		/**
		 * Mark the line as an alternate to the previous line, for when the Option
		 * key is pressed, in the dropdown.
		 */
		alternate?: boolean;

		/**
		 * Set an image for the item. It must be a base64 encoded string.
		 */
		templateImage?: string;

		/**
		 * Set an image for this item. It must be a base64 encoded string.
		 */
		image?: string;

		/**
		 * Convert text to emojis, such as :mushroom:.
		 */
		emojize?: boolean;

		/**
		 * Enable parsing of ANSI codes.
		 */
		ansi?: boolean;
	}

	// Options provided by this module.
	interface Options extends BitbarOptions {
		/**
		 * Add a submenu to the item. A submenu is composed of an array of items.
		 */
		submenu?: (string | BitbarOptions)[];
	}
}

declare const bitbar: {
	(
		items: readonly (string | bitbar.Options)[],
		options?: bitbar.BitbarOptions,
	): void;

	/**
	 * Add a separator.
	 */
	separator: symbol;

	/**
	 * Check that dark mode is enabled.
	 */
	darkMode: boolean;
};

export = bitbar;
