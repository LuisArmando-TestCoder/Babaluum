import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import local from "./tooling/eslint-rules/index.js";

const layer = (group, message) => ({ group, message });

const EFFECT_MESSAGE =
  "Effects live in src/hooks or src/providers. Derive state, use motion values, or write a named hook.";

const NO_EFFECTS = [{ name: "react", importNames: ["useEffect", "useLayoutEffect"], message: EFFECT_MESSAGE }];

const forbid = (...layers) => [
  "error",
  { paths: NO_EFFECTS, patterns: layers.map(({ group, message }) => ({ group, message })) },
];

const forbidWithEffects = (...layers) => [
  "error",
  { patterns: layers.map(({ group, message }) => ({ group, message })) },
];

const UI = layer(
  ["react", "react-dom", "framer-motion", "lenis", "lenis/*", "next", "next/*", "@/components/*", "@/hooks/*", "@/providers/*", "@/app/*"],
  "domain/ is pure logic. It must not depend on React, UI, or the framework.",
);
const COMPONENTS = layer(["@/components/*"], "This layer sits below components.");
const SECTIONS = layer(["@/components/sections/*"], "Only routes compose sections.");
const LAYOUT = layer(["@/components/layout/*"], "Only routes and sections use layout.");
const CHARACTERS = layer(["@/components/characters/*"], "Characters are composed by sections, not primitives.");
const PLAYGROUND = layer(["@/components/playground/*"], "The physics playground is composed by sections.");
const CONTENT = layer(["@/content/*"], "Primitives receive content through props.");
const CARDS = layer(["@/components/cards/*"], "Cards are composed by sections.");
const APP = layer(["@/app/*"], "Nothing imports from routes.");
const ROUTE_INTERNALS = layer(
  ["@/components/primitives/*", "@/components/motion/*", "@/components/characters/*", "@/components/playground/*", "@/components/cards/*", "@/hooks/*", "@/domain/*"],
  "Routes stay thin: compose sections, layout and providers only.",
);

const SYNTAX_BANS = [
  { selector: "MemberExpression[object.name='React'][property.name=/^use(Layout)?Effect$/]", message: EFFECT_MESSAGE },
  { selector: "TSEnumDeclaration", message: "Use a union of string literals or an `as const` object." },
  { selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]", message: "Hex colors live in src/styles/tokens or a palette.ts." },
];

const DEFAULT_EXPORT_BAN = {
  selector: "ExportDefaultDeclaration",
  message: "Use named exports. Default exports are reserved for Next.js route files.",
};

export default tseslint.config(
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "public/**"] },
  ...tseslint.configs.strict,
  {
    plugins: { "@next/next": nextPlugin, "react-hooks": reactHooks, local },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "local/no-comments": "error",
      "local/scss-module-name": "error",
      "no-console": "error",
      "no-nested-ternary": "error",
      "no-param-reassign": ["error", { props: false }],
      "max-depth": ["error", 3],
      "max-params": ["error", 3],
      "max-lines": ["error", { max: 220, skipBlankLines: true }],
      "max-lines-per-function": ["error", { max: 90, skipBlankLines: true }],
      complexity: ["error", 10],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "no-restricted-syntax": ["error", DEFAULT_EXPORT_BAN, ...SYNTAX_BANS],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/hooks/**", "src/providers/**"],
    rules: {
      "no-restricted-imports": ["error", { paths: NO_EFFECTS }],
      "no-restricted-globals": [
        "error",
        { name: "setTimeout", message: "Timers hide ordering bugs. Use motion transitions or a named hook." },
        { name: "setInterval", message: "Timers hide ordering bugs. Use useAnimationFrame or a named hook." },
      ],
    },
  },
  { files: ["src/domain/**/*.ts"], rules: { "no-restricted-imports": forbid(UI, CONTENT) } },
  { files: ["src/content/**/*.ts"], rules: { "no-restricted-imports": forbid(COMPONENTS, APP) } },
  { files: ["src/hooks/**/*.ts", "src/providers/**/*.tsx"], rules: { "no-restricted-imports": forbidWithEffects(COMPONENTS, CONTENT, APP) } },
  {
    files: ["src/components/primitives/**/*.{ts,tsx}", "src/components/motion/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": forbid(SECTIONS, LAYOUT, CHARACTERS, PLAYGROUND, CARDS, CONTENT, APP) },
  },
  {
    files: ["src/components/cards/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": forbid(SECTIONS, LAYOUT, CHARACTERS, PLAYGROUND, CONTENT, APP) },
  },
  {
    files: ["src/components/characters/**/*.{ts,tsx}", "src/components/playground/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": forbid(SECTIONS, LAYOUT, CARDS, CONTENT, APP) },
  },
  { files: ["src/components/layout/**/*.{ts,tsx}"], rules: { "no-restricted-imports": forbid(SECTIONS, APP) } },
  { files: ["src/components/sections/**/*.{ts,tsx}"], rules: { "no-restricted-imports": forbid(APP) } },
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": forbid(ROUTE_INTERNALS), "no-restricted-syntax": ["error", ...SYNTAX_BANS] },
  },
  {
    files: ["*.config.{ts,mjs,js}", "tooling/**/*.js"],
    rules: { "no-restricted-syntax": "off" },
  },
  { files: ["src/**/*.test.ts"], rules: { "max-lines-per-function": "off" } },
  {
    files: ["**/palette.ts", "src/components/primitives/NotchedSurface/notchMask.ts"],
    rules: { "no-restricted-syntax": ["error", DEFAULT_EXPORT_BAN] },
  },
);
