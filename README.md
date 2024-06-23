# Typonomy
Type Management Utilities for TypeScript

[![npm version](https://badge.fury.io/js/typonomy.svg)](https://badge.fury.io/js/typonomy)

## Purpose
TypeScript allows developers to apply strict yet flexible type checking on top of an implicit (and very messy) JavaScript type paradigm.
Combined with JavaScript's flexible functions, TypeScript becomes a very readable, capable and safe functional programming language.
Typonomy exists to help achieve even greater readability, safety, and convenience by adding additional helper types and functions.

## Design Goals
* Make it convenient to avoid `any`; it's unsafe and unnecessary.
  * Type guards already exist or are easy to create.
* Support and encourage explicit typing.
  * But make types easily and safely inferrable to help reduce verbosity.
  * Code is more readable when the types are well-known.
* Use consistent names.
  * Try to reuse common vernacular when feasible.
  * Invent reasonable names when necessary, and explain what these new names mean.
* Support functional over object-oriented where possible.
  * Classes are mostly just objects/interfaces with function properties. The rest doesn't matter much.
  * Use explicit types to demonstrate functional programming concepts.
* Locate code for ease of development.
  * Consuming code can import submodules directly vs the entire module.
  * Keep submodules small and focused.
  * No circular submodule dependencies.
* Support the most common collections and iteration patterns
  * Arrays, objects, `Record<K,V>`.
  * `reduce`, `map`, and `forEach`-style functions for the above.
* Don't Repeat Yourself.
  * Reuse code internally.
* Document everything clearly and explicitly.
* Unit test everything.
  * The [unit tests](/softcraft-development/typonomy/tree/main/test) themselves become both documentation and usage examples.
* Strict type checking.
* Strict linting.

## Example Uses
To demonstrate the types and type safety, these examples use more explicit typing than is typically necessary.

### Short Circuit Iteration

```
import { Break, mapArray, type IndexedMapper } from "typonomy"
// value and index have inferred safe types.
const mapper: IndexedMapper<number, string> = (value, index) => {
  if (index === 2) throw Break
  return `${index}:${value}`
}
const mapped = mapArray([3, 5, 7, 11], mapper)
// `mapped` is `["0:3", "1:5"]`; 7 and 11 never get mapped.
```

### Explicit and Safe Nullish Handling
```
import type { Nullable, Optional, Possible, Reducer } from "typonomy"
import { appendExplicit, isNull, isString, isUndefined, or, reduceArray, typeGuard } from "typonomy"

const possibleStrings: Array<Possible<string>> = [
  "An explicit value",
  null,
  undefined,
]

const isNullableString = typeGuard<Nullable<string>>(or(isString, isNull))
const filterUndefined: Reducer<Nullable<string>[], Possible<string>, number> = (state, value, _index) => {
  if (isNullableString(value)) state.push(value)
  return state
}
// [ "An explicit value", null ]
const nullableStrings = reduceArray<Nullable<string>[], Possible<string>>(possibleStrings, filterUndefined, [])

// "Optional" is a synonym for "may be undefined", and comes from the notion of optional parameters and properties.
const isOptionalString = typeGuard<Optional<string>>(or(isString, isUndefined))
const filterNull: Reducer<Optional<string>[], Possible<string>, number> = (state, value, _index) => {
  if (isOptionalString(value)) state.push(value)
  return state
}
// [ "An explicit value", undefined ]
const optionalStrings = reduceArray<Optional<string>[], Possible<string>>(possibleStrings, filterNull, [])

// "Explicit" excludes null and undefined. `appendExplicit` already does this.
const filterNullish: Reducer<string[], Possible<string>, number> = appendExplicit<string>
// [ "An explicit value" ]
const strings = reduceArray<string[], Possible<string>>(possibleStrings, filterNullish, [])
```

### Put Single Values and Arrays on Equal Terms
```
import type { Optional, Reducer, Some } from "typonomy"
import { addMore, isExplicit, isPlural, reduceSome } from "typonomy"


const countStrings: Reducer<number, Optional<string>, number> = (state, value) => state + (isExplicit(value) ? 1 : 0)
let someStrings: Some<string> = "One String"
// howManyStrings = 1
let howManyStrings = reduceSome(someStrings, countStrings, 0)

const manyStrings = addMore(someStrings, "Another string")
someStrings = manyStrings
// howManyStrings = 2
howManyStrings = reduceSome(someStrings, countStrings, 0)

if (isPlural(someStrings)) {
  const first: Optional<string> = manyStrings[0]
}
else {
  // It isn't, but it could have been if we'd done this before addMore().
  const str: string = someStrings
}
```

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
See the [**API Documentation**](docs/globals.md)

## Modules

Typonomy includes three kinds of [JavaScript module format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
The process for achieving this is inspired by [this blog post from SenseDeep](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html).
This library uses [ESBuild](https://esbuild.github.io/api/#platform) for constructing each module platform.

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

## Issues and Discussion
Please feel free to propose any fixes, additions, modifications, or clarifications at the [GitHub Issues for the project](https://github.com/softcraft-development/typonomy/issues).
Pull requests and forks are welcome for consideration for include into the main project.

## License
Typonomy is licensed under the [MIT License](https://opensource.org/licenses/MIT).
