# Monorepo Template

This is a template for build Monorepo repositories using `Yarn Workspaces` with NextJs and ExpressJs applications. Here you can copy my ESLint, Prettier, Jest, etc configurations.

With you want to know more about Monorepo, I recommend to watch [Código Fonte TV](https://www.youtube.com/watch?v=BbNIuUy_F0w) video explaining with monorepos advantages and disadvantages.

## Package.json

To start using `Yarn Workspaces`, you first need to create a `package.json` file in the root directory and setup like this:

```json
// package.json
{
  "name": "monorepo", // Here you can use any name you want
  "version": "1.0.0",
  "main": "index.js",
  "private": true, // This is really needed according to Yarn docs
  "workspaces": {
    "packages": [
      "packages/*" // Here you set projects directories
    ]
  },
  "author": "",
  "license": "MIT",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "@monorepo/eslint-config": "*"
  },
  "devDependencies": {
    "typescript": "^4.2.4"
  }
}
```

## ESLint and Prettier Configuration

In this repository was used AirBnB style guide with some rules that I rather like.

### Global Config

This is needed for all projects in this repository recognize the ESLint config created in `packages/eslint-config`.

```js
// eslintrc.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@monorepo/eslint-config');

module.exports = config;
```

### ESLint Config Package

It's convention to create a package for eslint configuration.

Here is my configuration file:

```json
// packages/eslint-config/.eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    "react/jsx-filename-extension": [
      2,
      { "extensions": [".js", ".jsx", ".ts", ".tsx"] }
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    "@typescript-eslint/camelcase": "off",
    "prettier/prettier": "error",
    "react/jsx-props-no-spreading": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
```

### Prettier Config

This is needed to avoid conflict between ESLint and Prettier.

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "arrowParens": "avoid",
  "trailingComma": "all",
  "endOfLine": "auto"
}
```

## Jest Configuration

Same as ESLint, is good to create a global Jest config file and set to run the tests in each project.

```js
// jest.config.js
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx'],
};
```

After this you will be able to create a `jest.config.js` file for each project in their directories using any configuration for your project.

## Considerations

This template was based on [Rocketseat](https://www.youtube.com/watch?v=k5TkBcUTJus) video and [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) docs.
