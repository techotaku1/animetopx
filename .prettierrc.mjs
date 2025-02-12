/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	plugins: ['prettier-plugin-tailwindcss'],
	trailingComma: 'es5',
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	printWidth: 80,
	useTabs: true,
	bracketSpacing: true,
	arrowParens: 'always',
	endOfLine: 'lf',
	jsxSingleQuote: false,
	proseWrap: 'preserve',
	htmlWhitespaceSensitivity: 'css',
	embeddedLanguageFormatting: 'auto',
	tailwindStylesheet: './src/styles/globals.css',
};

export default config;
