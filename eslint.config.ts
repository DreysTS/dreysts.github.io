module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:vue/vue3-recommended",
		"@vue/eslint-config-airbnb",
		"airbnb",
		"airbnb-typescript",
		"prettier",
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
	},
	rules: {
		"prettier/prettier": [
			"error",
			{
				semi: true,
				tabWidth: 2,
				useTabs: false,
				singleQuote: false,
				trailingComma: "all",
				printWidth: 80,
			},
		],
	},
};
