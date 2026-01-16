module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "no-duplicate-selectors": true,
    // Allow hyphens in BEM block names, e.g. `parents-tabs__wrapper`
    "selector-class-pattern": "^[a-z][a-z0-9-]*(__[a-z0-9-]+)?(--[a-z0-9-]+)?$",
  },
};


