import vue from "eslint-plugin-vue";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: [
      "logs/**/*",
      "*.log",
      "node_modules",
      "dist*",
      ".vscode",
      ".idea",
      "*.local",
      ".cjs",
    ],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { browser: "readonly", node: "readonly" },
    },

    plugins: {
      vue,
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },

    rules: {},

    settings: {
      "import/resolver": {
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".vue", ".ts"],
        },
      },
    },
  },
];
