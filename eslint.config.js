import js from "@eslint/js";

export default [
  { ignores: ["dist", "node_modules", "public"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      "no-undef": "off",
    },
  }
];
