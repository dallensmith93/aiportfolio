import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: [
      "dist",
      "coverage",
      "scripts/**",
      "**/*.d.ts",
      "playwright.config.ts",
      "tailwind.config.ts",
      "vite.config.ts",
      "vitest.config.ts"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module"
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-undef": "off",
      "react-refresh/only-export-components": "off"
    }
  },
  {
    files: ["src/test/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        vi: "readonly"
      }
    }
  }
];
