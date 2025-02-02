import compatPlugin from "eslint-plugin-compat";
import eslintPlugin from "@eslint/js";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import jestPlugin from "eslint-plugin-jest";
import prettierRecommendedPlugin from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import testingLibraryPlugin from "eslint-plugin-testing-library";
import typescriptPlugin from "typescript-eslint";
import pluginQuery from '@tanstack/eslint-plugin-query'

import { fixupPluginRules } from "@eslint/compat";

export default typescriptPlugin.config(
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
      "react-hooks": fixupPluginRules(reactHooksPlugin),
    },
    extends: [
      eslintPlugin.configs.recommended,
      reactPlugin.configs.flat.recommended,
      pluginQuery.configs['flat/recommended'],
      prettierRecommendedPlugin,
      compatPlugin.configs["flat/recommended"],
    ],
    settings: {
      "import/resolver": {
        typescript: {
          typescript: true,
          node: true,
        },
      },
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": ["off"],
      "prefer-destructuring": ["off"],
      "no-use-before-define": ["off"],
      "no-restricted-syntax": ["off"],
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["RouterLink", "Link"],
          specialLink: ["to"],
          aspects: ["noHref", "invalidHref", "preferButton"],
        },
      ],
      "jsx-a11y/no-noninteractive-element-interactions": [
        "error",
        {
          handlers: [
            "onClick",
            "onMouseDown",
            "onMouseUp",
            "onKeyPress",
            "onKeyDown",
            "onKeyUp",
          ],
        },
      ],
      "jsx-a11y/click-events-have-key-events": ["error"],
      "jsx-a11y/alt-text": ["error"],
      "jsx-a11y/no-static-element-interactions": [
        "error",
        {
          handlers: [
            "onClick",
            "onMouseDown",
            "onMouseUp",
            "onKeyPress",
            "onKeyDown",
            "onKeyUp",
          ],
          allowExpressionValues: true,
        },
      ],
      "react/no-unknown-property": ["error"],
      "react/no-access-state-in-setstate": ["error"],
      "react/no-array-index-key": ["error"],
      "react/no-unstable-nested-components": ["error"],
      "react/display-name": ["off"],
      "react/prop-types": ["off"],
      "react/jsx-no-constructed-context-values": ["error"],
      "react/no-unescaped-entities": ["off"],
      eqeqeq: ["error"],
      "no-console": ["error", { allow: ["error", "debug"] }],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [...typescriptPlugin.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-use-before-define": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*.{spec,test}.{ts,tsx}"],
    plugins: {
      jest: jestPlugin,
      "testing-library": testingLibraryPlugin,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      ...testingLibraryPlugin.configs.react.rules,
      "testing-library/render-result-naming-convention": "off",
    },
  },
);
