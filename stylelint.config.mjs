const TOKENS = "src/styles/tokens/**/*.scss";

export default {
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "selector-class-pattern": ["^[a-z][a-zA-Z0-9]*$", { message: "Module classes are camelCase so they read as styles.camelCase." }],
    "color-no-hex": [true, { message: "Use a token from src/styles/tokens/_colors.scss." }],
    "color-named": ["never", { message: "Use a token from src/styles/tokens/_colors.scss." }],
    "function-disallowed-list": [["rgb", "rgba", "hsl", "hsla"], { message: "Use a token, or color.change() on a token." }],
    "declaration-no-important": true,
    "selector-max-id": 0,
    "max-nesting-depth": [3, { ignoreAtRules: ["include", "media", "supports"] }],
    "selector-max-compound-selectors": 4,
    "declaration-property-value-disallowed-list": [
      {
        "z-index": ["/^-?\\d+$/"],
        transition: ["/all/"],
        "font-size": ["/^0?\\.(?:[0-6]\\d*|7[0-4]\\d*)rem$/", "/^(?:\\d|1[01])(?:\\.\\d+)?px$/"],
      },
      { message: "Use z-index tokens, name the transitioned properties, and keep text at 12px (0.75rem) or larger so it reads on phones." },
    ],
    "scss/at-use-no-unnamespaced": null,
    "scss/dollar-variable-pattern": "^[a-z][a-z0-9-]*$",
    "scss/at-mixin-pattern": "^[a-z][a-z0-9-]*$",
    "property-no-vendor-prefix": [true, { ignoreProperties: ["mask", "mask-composite", "mask-image"] }],
  },
  overrides: [
    {
      files: ["src/app/globals.scss"],
      rules: { "selector-class-pattern": null },
    },
    {
      files: [TOKENS],
      rules: { "color-no-hex": null, "function-disallowed-list": null, "declaration-property-value-disallowed-list": null },
    },
  ],
};
