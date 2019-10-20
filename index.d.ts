declare namespace bitbar {
	// Options for the original BitBar program, taken from here:
	// https://github.com/matryer/bitbar#plugin-api
	interface BitbarOptions {
		// The only required property.
		text: string;

		href?: string;
		color?: string;
		font?: string;
		size?: number;
		bash?: string;

		// There are up to 5 params hardcoded into the program.
		param1?: string;
		param2?: string;
		param3?: string;
		param4?: string;
		param5?: string;

		terminal?: boolean;
		refresh?: boolean;
		dropdown?: boolean;
		length?: number;
		trim?: boolean;
		alternate?: boolean;
		templateImage?: string;
		image?: string;
		emojize?: boolean;
		ansi?: boolean;
	}

	// Options provided by this module.
	interface Options extends BitbarOptions {
		submenu?: (string | BitbarOptions)[];
	}
}

declare const bitbar: {
	(items: (string | bitbar.Options)[], options?: bitbar.BitbarOptions): void;

	separator: symbol;

	darkMode: boolean;
};

export = bitbar;
