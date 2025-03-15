import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginPrettier from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["eslint.config.mjs", "node_modules"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginPrettier,
);
