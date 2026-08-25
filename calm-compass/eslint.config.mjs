import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  globalIgnores([".next/**", "coverage/**", "playwright-report/**", "schema/**"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ...js.configs.recommended,
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        sourceType: "module",
        babelOptions: {
          presets: [
            "@babel/preset-typescript",
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
        ...globals.worker,
        ...globals["shared-node-browser"],
        ...globals.vitest,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
]);
