
/**
 * A signal to break out of the typical execution flow, and optionally include a final result.
 * Typonomy iteration functions (which typically start with `for*`, `map*`, or `reduce*`) will `catch` this signal
 * and use it to short-circuit the iteration.
 * Note that this looks like an `Error`, and can be `throw`n and `catch`ed like one, but is not an `Error`.
 */
export class BreakExecution {
  /**
   * The reason why execution was aborted.
   */
  readonly message: string

  /**
   * Creates a new instance of the BreakExecution class.
   * @param message - The reason why execution was aborted. Defaults to "Break Execution".
   */
  constructor(message = "Break Execution") {
    this.message = message
  }

  /**
   * Returns the break message.
   * @returns The `message` used to construct the `BreakExecution`.
   */
  toString(): string {
    return this.message
  }
}

/**
 * A `BreakExecution` instance that can be used in general contexts.
 */
export const Break = new BreakExecution()

/**
 * Checks if the provided value is a `BreakExecution`.
 * @param value - The value to check.
 * @returns `true` if the value is a `BreakExecution`, `false` otherwise.
 */
export function isBreakExecution(value: unknown): value is BreakExecution {
  return value instanceof BreakExecution
}

/**
 * Return a value if the exception is a `BreakExecution`, or (re)throw it otherwise.
 * The typical use case is to call this from a `catch(exception)` block where `BreakExecution` is expected.
 *
 * @typeParam R - The type of the return value.
 * @param exception - Any object, which is expected to
 * @param returnValue - The value to return if the exception is a `BreakExecution`.
 * @returns The `returnValue` if the exception is a `BreakExecution`; otherwise `exception` is thrown.
 * @throws The `exception` if it is not a `BreakExecution`.
 */
export function onBreakExecution<R>(exception: unknown, returnValue: R): R {
  if (isBreakExecution(exception)) {
    return returnValue
  }
  throw exception
}
