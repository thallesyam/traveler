import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";


/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["**/*.config.{js,ts}", "**/vite.config.{js,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: "./tsconfig.json"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin
    },
    rules: {
      // ESLint base rules
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-unused-vars": "off", // Handled by @typescript-eslint/no-unused-vars
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "prefer-const": "error",
      
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }],
      
      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-filename-extension": ["error", { "extensions": [".tsx", ".jsx"] }],
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/function-component-definition": ["error", {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }],
      
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  },
  {
    files: ["**/*.config.{js,ts}", "**/vite.config.{js,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-unused-vars": "warn",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "prefer-const": "error"
    }
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];

export default config;
