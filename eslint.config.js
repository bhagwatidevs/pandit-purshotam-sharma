import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist/**", "node_modules/**", "backend/node_modules/**"]),
  {
    files: ["src/**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // React's automatic JSX transform makes the historical default import optional.
      "no-unused-vars": ["error", {
        varsIgnorePattern: "^React$",
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
      // Effects used for API fetching intentionally update loading/data state.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs",
      parserOptions: { ecmaVersion: "latest" },
    },
    extends: [js.configs.recommended],
    rules: {
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
    },
  },
  {
    files: ["vite.config.js", "eslint.config.js"],
    languageOptions: {
      globals: globals.node,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    extends: [js.configs.recommended],
  },
]);
