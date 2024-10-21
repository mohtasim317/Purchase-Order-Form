// Thank you Mr Chocolatine 🙏
// https://gist.github.com/MrChocolatine/367fb2a35d02f6175cc8ccb3d3a20054

// In TS, interfaces are "open" and can be extended
export interface Date {
  /**
   * Give a more precise return type to the method `toISOString()`:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
   */
  toISOString: () => TDateISO;
}

export type TYear = `${number}${number}${number}${number}`;
export type TMonth = `${number}${number}`;
export type TDay = `${number}${number}`;
export type THours = `${number}${number}`;
export type TMinutes = `${number}${number}`;
export type TSeconds = `${number}${number}`;
export type TMilliseconds = `${number}${number}${number}`;

/**
 * Represent a string like `2021-01-08`
 */
export type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

/**
 * Represent a string like `14:42:34.678`
 */
export type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values for months, hours etc) as
 * it would result in a warning from TypeScript:
 *   "Expression produces a union type that is too complex to represent. ts(2590)
 */
export type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;
