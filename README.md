# Typonomy
Type Management Utilities for TypeScript

[![npm version](https://badge.fury.io/js/typonomy.svg)](https://badge.fury.io/js/typonomy)

## Installation

You can install Typonomy using npm, yarn, or pnpm:

```bash
npm install typonomy
```

```bash
yarn add typonomy
```

```bash
pnpm add typonomy
```

## Documentation
See the [**API Documentation**](docs/README.md)

## Modules

Typonomy includes three kinds of [JavaScript module format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
The process for achieving this is inspired by [this blog post from SenseDeep](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html).
This library uses [ESBuild](https://esbuild.github.io/api/#format) for constructing each module format.

### ES Module
Exports all code as an ECMAScript Module, suitable for import:

`import * as typonomy from 'typonomy'`

You can also import submodules:

`import * as array from 'typonomy/array'`

ES Modules are typically used:
  * In browser-based applications.
  * In applications that use a JS packaging system (ex: Bundler, Webpack, ESBuild, etc)
  * In [modern Node.js applications](https://nodejs.org/api/packages.html#determining-module-system).

### CommonJS module.

Exports all code as an ECMAScript Module, suitable for require.

`const typonomy = require('typonomy')`

You can also require submodules:

`const array = require('typonomy/array')`

CommonJS modules are typically used by older Node.JS applications.

## License
Typonomy is licensed under the [MIT License](https://opensource.org/licenses/MIT).
