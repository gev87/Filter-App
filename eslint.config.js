import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import vitest from "eslint-plugin-vitest";


export default [
	{ ignores: ["dist"] },
	{
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
		},
		settings: { react: { version: "detect" } },
		plugins: {
			react,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			...reactHooks.configs.recommended.rules,
			"react/jsx-no-target-blank": "off",
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"react/prop-types": "off",
		},
	},
	{
		files: ["**/*.test.{js,jsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node, 
			},
		},
		plugins: {
			vitest,
		},
		env: {
			"vitest-globals/env": true, 
		},
	},
];
