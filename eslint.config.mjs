import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
	// 🔹 Ignorar archivos innecesarios
	{
		ignores: [
			'**/node_modules/**',
			'.next/**',
			'out/**',
			'public/**',
			'dist/**',
			'**/*.d.ts',
			'.vercel/**',
      'src/components/ui/**'
		],
	},

	// 🔹 Configuración para archivos JS/TS
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: process.cwd(),
				ecmaFeatures: { jsx: true },
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
			},
		},
		linterOptions: {
			reportUnusedDisableDirectives: false, // Change this to false
			noInlineConfig: false,
		},
		plugins: {
			'@typescript-eslint': tseslintPlugin,
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn', // Change to warn instead of error
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
		},
	},

	// 🔹 Configuración de Next.js, TypeScript e Importaciones
	...compat.config({
		extends: [
			'eslint:recommended',
			'next/core-web-vitals',
			'next/typescript',
      'eslint:recommended', 
      'next',
			'plugin:@next/next/recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:@typescript-eslint/recommended-type-checked',
			'plugin:@typescript-eslint/stylistic-type-checked',
			'plugin:import/recommended',
			'plugin:drizzle/recommended',
			'prettier',
		],

   // Mantener todas tus reglas personalizadas
		rules: {
			// ⚠️ **Advertencias de Código**
			'no-console': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn', // Make sure this is also warn here
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
			],
			'@typescript-eslint/require-await': 'warn',
			'@typescript-eslint/no-misused-promises': [
				'warn',
				{ checksVoidReturn: { arguments: false, attributes: false } },
			],
			'@typescript-eslint/no-floating-promises': 'warn',

			// 🚨 **Errores Críticos**
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-call': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'no-unused-expressions': 'error',
			'no-duplicate-imports': 'error',

			// 🔹 **Next.js y React**
			'react/react-in-jsx-scope': 'off',
			'react/self-closing-comp': [
				'warn',
				{
					component: true,
					html: true,
				},
			],

			// 🔹 **Drizzle ORM**
			'drizzle/enforce-delete-with-where': [
				'warn',
				{ drizzleObjectName: ['db', 'ctx.db'] },
			],
			'drizzle/enforce-update-with-where': [
				'warn',
				{ drizzleObjectName: ['db', 'ctx.db'] },
			],

			// 🔹 **Orden de Imports**
			'import/order': [
				'warn',
				{
					'newlines-between': 'always',
					groups: [
						['builtin', 'external'],
						'internal',
						['parent', 'sibling', 'index'],
						'type',
					],
					pathGroups: [
						{ pattern: 'react', group: 'external', position: 'before' },
						{ pattern: 'next/**', group: 'external', position: 'before' },
						{
							pattern: '@/components/**',
							group: 'internal',
							position: 'after',
						},
						{ pattern: '@/lib/**', group: 'internal', position: 'after' },
						{ pattern: '@/styles/**', group: 'internal', position: 'after' },
					],
					pathGroupsExcludedImportTypes: ['react'],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'import/no-unresolved': 'warn',
			'import/no-duplicates': 'warn',
			'import/newline-after-import': 'warn',

			// Nuevas reglas importantes de Next.js repo

			// 🔹 JavaScript Best Practices
			'array-callback-return': 'error',
			'default-case': ['error', { commentPattern: '^no default$' }],
			eqeqeq: ['error', 'smart'],
			'no-array-constructor': 'error',
			'no-caller': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-implied-eval': 'error',
			'no-iterator': 'error',
			'no-lone-blocks': 'error',
			'no-new-wrappers': 'error',
			'no-throw-literal': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-rename': [
				'error',
				{
					ignoreDestructuring: false,
					ignoreImport: false,
					ignoreExport: false,
				},
			],

			// 🔹 React Específicas
			'react/forbid-foreign-prop-types': ['error', { allowInPropTypes: true }],
			'react/jsx-no-comment-textnodes': 'error',
			'react/jsx-no-duplicate-props': 'error',
			'react/no-danger-with-children': 'error',
			'react/no-deprecated': 'error',
			'react/no-direct-mutation-state': 'error',
			'react/no-is-mounted': 'error',
			'react/no-typos': 'error',
			'react/require-render-return': 'error',
			'react/style-prop-object': 'error',

			// 🔹 TypeScript Específicas
			'@typescript-eslint/no-redeclare': [
				'error',
				{ builtinGlobals: false, ignoreDeclarationMerge: true },
			],
			'@typescript-eslint/prefer-as-const': 'error',
			'@typescript-eslint/no-this-alias': 'error',

			// 🔹 Import/Export
			'import/no-anonymous-default-export': [
				'error',
				{
					allowArrowFunction: false,
					allowAnonymousClass: false,
					allowAnonymousFunction: false,
					allowArray: true,
					allowCallExpression: true,
					allowLiteral: true,
					allowObject: true,
				},
			],
		},
		settings: {
			'import/resolver': {
				alias: {
					map: [['@', './src']],
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
			react: { version: 'detect' },
			next: { rootDir: process.cwd() },
		},
	}),
];

export default eslintConfig;
