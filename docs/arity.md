# Currying, Partial Application, and Function Arity

Currying and partial application are two functional programming techniques to reduce the arity of functions.
Typonomy uses explicit typing and naming conventions to illustrate the theory and practice of these two techniques.

## Arity

[Arity](https://en.wikipedia.org/wiki/Arity) refers to the number of parameters ([a.k.a. _arguments_](https://stackoverflow.com/questions/156767/whats-the-difference-between-an-argument-and-a-parameter)) that a function accepts.
The term refers to the generalization of words like  _unary_, _binary_, and _ternary_, which refer to sets of one, two, and three things respectively.
Thus a "binary function" is one which takes two parameters, and is described as having "arity 2".
For example, we may have a function `add(a, b)`, where `a` and `b` are the two parameters to be added together.
_Arity_ may also be referred to as _rank_, _order_, or _degree_.

## Reducing Arity
In functional programming, it may be useful or convenient to reduce the arity of a function.
This makes the function available to be called by callers that can only accept the lower-arity function.
This then increases the flexibility of the original function.
For example, a particular arity-2 function could be called by anything that accepts an arity-2 function;
when its arity is reduced, it can then _also_ be called by anything that accepts an arity-1 function.

## Arity in Typonomy
Typonomy has several convenience types functions that represent functions of arity 0, 1, and 2.
While it is possible to describe these functions using their _-ary_ names (i.e.: _nullary_, _unary_, and _binary),
Typonomy aims to make these types more memorable by giving them names that reflect their typical usage.

Since Typonomy strives for strict and explicit type checking in TypeScript, these types are all [generic](https://www.typescriptlang.org/docs/handbook/2/generics.html) (i.e.: they have type variables).
All of them take at least one type variable `R`, which refers to the return type of the function.
Thus each arity type will have one more type variable than it has arity.

Note that these types are merely aliases, meant to increase readability.
TypeScript does apply any restrictions on type checking based on these type names.
For example, `let a: Transform<number, string>` and `let b: (number) => string` are entirely equivalent declarations,
and `a = b` or `b = a` are both valid reassignments.

### `Thunk`
A [`Thunk<R>`](./type-aliases/Thunk.md) is an arity-0 (_nullary_) function.
It has no parameters, yet returns a value of type `R`.
The name ["thunk"](https://en.wikipedia.org/wiki/Thunk) was created to imply "thinking" in the past tense;
the eventual result thunk has been defined earlier, but it has not been executed yet.
Since it takes no input, a `Thunk` is rarely pure;
most often its return value is dependent on a value outside of its scope, and thus is a [_closure_](https://en.wikipedia.org/wiki/Closure_(computer_programming)).
Otherwise, a thunk typically returns a constant value, or is generating its value from some external source (such as a stream or a random number generator).

#### Example `Thunk`
```
const thunk: Thunk<string> = () => "Always returns this string."
```

### `Transform`
A [`Transform<T,R>`](./type-aliases/Transform.md) is an arity-1 (_unary_) function.
It takes one parameter `T` and returns a value of type `R`.
Thus in a sense the function is _transforming_ the `T` into an `R`.
A _pure_ `Transform` would: _only_ use the parameter `T` to do this transformation;
it would not use any other values from outside the function,
nor would it ignore the parameter.

#### Example `Transform`
```
const transform: Transform<boolean, string> = (value: boolean) => value ? "Yes" : "No"
```

### `Combine`
A [`Combine<A,B,R>`](./type-aliases/Combine.md) is an arity-2 (_binary_) function.
It takes two parameters `A` and `B` and returns a value of type `R`.
Thus in a sense the function is _combining_ the `A` and the `B` to produce an `R`.
A _pure_ `Combine` would: _only_ use the parameters `A` and `B` to do this combination;
it would not use any other values from outside the function,
nor would it ignore either parameter.

#### Example `Combine`
```
const combine: Combine<number, string, string> = (a: number, b: string) => `(${number}): ${b}`
```

### `Reducer`
A [`Reducer<S,V,K>`](./type-aliases/Reducer.md) is an arity-3 (_ternary_) function.
Unlike `Thunk`, `Transform`, and `Combine`, it is not a _generalized_ ternary function,
as its types play specific roles:
* `S` is both the type of the first parameter _and_ the type of the return value.
  It is meant to represent the _state_ (or _accumulator_) of repeated executions of the function.
* `V` is the type of the second parameter,
  and generally represents the type of a set of values to be "reduced" to a single state `S`.
* `K` represents the "key" or "index" of the value `V`.
  `K` is almost always (though not required to be) a `string` or `number`, and is often ignored entirely.

Due to its unique signature, `Reducer` is, at best, a special-case Typonomy arity type.
It does have some some related arity-affecting functions (ex.: [`composeReducer`](./functions/composeReducer.md)),
but it does not adhere to the same patterns as the others.
A `Reducer<S,V,K>` that ignores it's key/index parameter (of type `K`) is effectively a `Combine<S,V,S>`.

## Partial Application
[Partial application](https://en.wikipedia.org/wiki/Partial_application) reduces the arity of a function
by providing a constant value for one of the function's parameters.
Typonomy provides 3 partial application functions:

### Arity-1
[`partial`](./functions/partial.md) converts a `Transform` to a `Thunk` by setting the transformed value to a constant.
For example:
```
  const describe: (value: string) => `The value is: ${value}`
  const describe42 = partial("always 42.")
  describe42() // -> "The value is: always 42."
```

A common use case for this is to defer the execution of the transformation of a particular value.
Once both the value and the transformation are known, they can be passed to `partial` to create a `Thunk`
that can be called at some point in the future -- and often by some other caller.

### Arity-2
[`partialLeft`](./functions/partialLeft.md) and [`partialRight`](./functions/partialRight.md) each convert a `Combine` into a `Transform` by setting one of the two parameters to a constant.
`partialLeft` sets the first `Combine` parameter to a constant, and `partialRight` sets the second.
For example:
```
  const divide: (dividend: number, divisor: number) => a / b
  const halve: partialRight(divide, 2)
  halve(16) // -> 8
```

Partially applying a `Combine` is often useful when one of the values to be combined is known ahead of the other.
A common use case is to combine one value with an entire collection of other values:
```
  const calculateInterest = (rate, principal) => rate * principal
  const currentInterestCalculator = partialLeft(0.07)
  const balances = [13, 17, 19, 23]
  const interestCharges = balances.map(currentInterestCalculator)
```

### Arity-3 and Higher
Writing partial application functions for higher-arity functions is reasonably straightforward:
```
function partialHigh(fn: (a: number, b: number, c: number, d: number) => number, constant: number):
  (a: number, b: number, d: number) => number {
    return (a: number, b: number, d: number) => fn(a,b,constant,d)
  }
```

## Currying
In Typonomy, [Currying](https://en.wikipedia.org/wiki/Currying) converts an arity-_n_ function into an arity-1 function that returns an arity-_n-1_ function.
It is closely related to partial application.
A curried function can be thought of as a function that will partially apply _any_ value passed to it to the underlying function.

### Arity-2
Typonomy's [`curry`](./functions/curry.md) function takes an arity-2 `Combine<A,B,R>` function and returns a `Transform` function.
This function itself transforms the first parameter of type `A` into a `Transform<B,R>` function.
Thus `curry` can be thought of as creating a "transform transformer".
For example:
```
  // Divide combines two numbers to produce the quotient
  const divide: (dividend: number, divisor: number) => a / b
  // createDivider transforms a divisor into a dividing function
  const createDivider: Transform<A, Transform<B,R>> = curry(divide)
  // This dividing function divides by 2
  const halve = createDivider(2)
  halve(16) // -> 8
  // This dividing function divides by 3
  const third = createDivider(3)
  third(27) // -> 9
```

Typonomy's [`yrruc`](./functions/yrruc.md) function does the same thing, but for the second parameter of type `B`,
transforming it into a `Transform<A,R>` function:
```
  // Reuse the exact same `divide` function from above.
  const divide: (dividend: number, divisor: number) => a / b
  // createDivision transforms a dividend into a dividing function
  const createDivision: Transform<B, Transform<A,R>> = yrruc(divide)
  // Now we can create an reciprocal function:
  const reciprocal = createDivision(1)
  reciprocal(2) // -> 0.5
```
`yrruc` is `curry` spelled backwards, to reflect that it is currying in the opposite order.
Note that this is _not_ the same operation as "uncurrying".

As discussed above, partial application is useful when you know a combination function and one of its two values before you know the second value.
Currying takes this concept one step further: it's useful when you _only_ know the combination function at first,
but also know that you will know _one_ of the two parameters before the second one.

### Fully Currying a Function
Typonomy defines currying as transforming an arity-_n_ function to an arity-1 function that returns an arity-_n-1_ function.
In other contexts, currying is often described as transforming an arity-_n_ function to a _sequence_ of arity-1 functions.
Typonomy distinguishes this a "_fully_ currying" a function.
You can achieve this effect in Typonomy by repeated calls to the available currying functions:
```
  // A common arity-3 function for calculating the Cartesian Y value of a line
  const linearY: (slope: number, x: number, yIntercept: number): number => (slope * x) + yIntercept
  // A fully-curried arity-3 function is an arity-1 function that returns an arity-1 function that returns an arity-1 function
  let fullyCurriedLinearY: Transform<number,<Transform<number,Transform<number,number>>>>
  // How you decide to order the individual transforms is really up to you.
  // Typically currying is described with the functions in order of parameter declaration:
  fullyCurriedLinearY = curry(curryLeft(linearY))
```

Most textbook examples of currying will immediately call all of the arity-1 functions
to show that the results of each function call are themselves functions:
```
  fullyCurriedLinearY(3)(11)(19) // -> 52
```

However, simplistic examples like this do not illustrate the utility of currying.
If you already have the function, slope, x value, and Y intercept, you might as well just call it directly:
```
  linearY(3, 11, 19) // -> Also 52.
```

### Currying in Practice

As discussed above, the value of currying (as with partial application) comes from being able to reduce the arity of a function,
and then using it in situations where not all of the parameters are immediately known.
Thus a more illustrative example should incorporate
Here's an example of using our arity-3 linear function to implement a (_very_ naive) regression solver:

```
// Let's start with a set of data points
interface Point { x: number, y: number }
const points: Point[] = loadArbitraryPointsFromSomewhereElse()

// Here's the same arity-3 linear equation from earlier.
const linearY: (slope: number, x: number, yIntercept: number): number => (slope * x) + yIntercept



// How well does a given prediction method fit the data?
// One method to determine this is to take the absolute difference between the actual and predicted values.
const absoluteError = (actual: number, prediction: number): number => Math.abs(actual - prediction)

// Another method is to square the differences.
const squaredError = (actual: number, prediction: number): number => Math.power(actual - prediction, 2)

// These two functions operate on general numbers; we want something that can operate on Points.
// We can write a function that transforms

const pointError = ()

function meanError(points: Point[], calculateError: Transform<Point, number>) {
  const errors = points.map(calculateError)
  const sum = errors.reduce((total, error) => total + error, 0)
  const mean = sumSquaredErrors / errors.length
  return mean
}
```


## Higher-Arity Functions
Typonomy only defines convenience types and functions for lower-arity functions:
* Types exist up to arity-2 (`Combine`).
* Partial application functions exist up to arity-2 (`partialLeft` and `partialRight`)
* Curry functions exist up to arity-3 (`curryLeft`, `curryMiddle`, and `curryRight`)

The techniques for reducing arity still apply to higher-arity functions, even if Typonomy does not provide them itself.

### Justification
Arity is theoretically infinite, so the choice of where to stop defining arity types and functions is arbitrary.
As the arity climbs, the applicability and general usefulness of the function decreases.
`Thunk`, `Transform` and `Combine` are relatively simple concepts to describe; arity-3 generally functions are not.

The number of possible explicit currying and partial application functions increases as the _cumulative sum_ of the maximum arity.
For example, creating currying functions for arity-4 functions would require an additional 4 functions on top of the 5 that already exist.
Currying functions for arity-5 functions would be an additional 5 functions on top of that, and so on.
Functions that curry or partially apply functions of arbitrary arity can and do exist,
but their signatures quickly become confusing.

Thus, creating names and explicit arity-reducing functions for higher-arity functions quickly reaches the point of diminishing returns.
Typonomy's stance is that, to preserve readability, any higher-arity function that requires currying or partial application is best served by a custom function with a context-specific name.
