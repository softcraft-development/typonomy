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
Exports all code as an ECMAScript Module, suitable for `import`:

`import * as typonomy from 'typonomy'`

You can also import submodules:

`import * as array from 'typonomy/array'`

ES Modules are typically used:
  * In browser-based applications.
  * In applications that use a JS bundler system (ex: Bundler, Bun, Webpack, ESBuild, Vite, etc).
  * In [modern Node.js applications](https://nodejs.org/api/packages.html#determining-module-system).

### CommonJS / Node module

Exports all code as a CommonJS, suitable for `require`.

`const typonomy = require('typonomy')`

You can also require submodules:

`const array = require('typonomy/array')`

CommonJS modules are typically used by older Node.JS applications.

### Browser script.

Exports all code as a ES6 script suitable for inclusion in browsers.
The code is wrapped in an [Immediately invoked function expression](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) (or "IIFE").

`<script src='typonomy/dist/browser/index.js'>`

You can also include submodules:

`<script src='typonomy/dist/browser/array.js'>`

Browser scripts are typically used by older web browser-based applications.

## License
Typonomy is licensed under the [MIT License](https://opensource.org/licenses/MIT).
