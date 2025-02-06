/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	plugins: ['prettier-plugin-tailwindcss'],
	trailingComma: 'es5', // Añadir coma al final de listas y objetos
	tabWidth: 2, // Tamaño del tabulador
	semi: true, // Usar punto y coma al final de las declaraciones
	singleQuote: true, // Usar comillas simples en lugar de dobles
	printWidth: 80, // Longitud máxima de línea
	useTabs: true, // Usar tabs en lugar de espacios
	bracketSpacing: true, // Espacio entre llaves en objetos
	arrowParens: 'always', // Paréntesis en funciones flecha con un solo argumento
	endOfLine: 'lf', // Usar LF para el final de línea
	jsxSingleQuote: false, // Usar comillas dobles en JSX
	proseWrap: 'preserve', // Mantener el formato original en Markdown
	htmlWhitespaceSensitivity: 'css', // Sensibilidad al espacio en blanco en HTML
	embeddedLanguageFormatting: 'auto', // Formatear automáticamente el código embebido
	tailwindStylesheet: './src/styles/globals.css', // Usar tailwindStylesheet en lugar de tailwindConfig
};

export default config;