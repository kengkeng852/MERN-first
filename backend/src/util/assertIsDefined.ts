export function assertIsDefined<T>( // T for passing any type of value
  value: T,
  message: string = "Value is not defined"
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
}