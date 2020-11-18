/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Checks whether a given value is an object, where array's explicitly do not count as objects.
 *
 * Since `typeof arr === "object"` results in true, one usually has to combine that
 * with `Array.isArray(arr)` to differentiate between an array an actual object. This
 * function just avoid the double check by combining it into one thing.
 *
 * Is a function like this *really* needed? Perhaps not, but here we are.
 *
 * @returns Returns a boolean indicating whether the value is an actual object
 */
export function isObject(value: any): boolean {
  if (!value) {
    return false;
  }

  if (typeof value === "object") {
    return !Array.isArray(value);
  }

  return false;
}

/**
 * Checks whether a given value is a plain object, where a plain object is an object
 * that was NOT derived from a Super Class, ie, it is:
 * - an object literal `{ name: "A" }`
 * - created with `new Object({ name: "B" })`
 * - created with `Object.create({ name: "C" })`
 *
 * A plain object is NOT:
 *
 * - `new Date()`
 * - `new Person({ name: "D" })`
 *
 * @returns Returns a boolean indicating whether the value is a plain object
 */
export function isPlainObject(value: any): boolean {
  if (!value || !isObject(value)) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  // Prototype may be null if you used `Object.create(null)`
  // Checking `proto`'s constructor is safe because `getPrototypeOf()` explicitly crosses
  // the boundary from object data to object metadata

  // By checking the constructor.name property instead of proto.constructor === Object,
  // we support objects generated using Node.js 'vm' module

  // return !proto || proto.constructor === Object;
  return !proto || proto.constructor.name === "Object";
}

/**
 * Checks whether a given value is a data object, where a data object IS A plain object
 * ([[isPlainObject]]), with the further limitation that it contains no functions, only
 * properties and values. For eg:
 * ``` javascript
 * {
 *   name: "John",
 *   age: 20
 * }
 * ```
 *
 * @returns Returns a boolean indicating whether the value is a data object
 */
export function isDataObject(value: any): boolean {
  if (!value || !isPlainObject(value)) {
    return false;
  }

  return Object.keys(value).filter((k) => typeof value[k] === "function").length === 0;
}

/**
 * Checks whether a given value is an empty object, where an empty object is `{}`.
 *
 * @returns Returns a boolean indicating whether the value is an empty object
 */
export function isEmptyObject(value: any): boolean {
  if (!value || !isPlainObject(value)) {
    return false;
  }

  // changed the initial check from isObject to isPlainObject, simplifying the return statement
  // because Object.keys(new Date()).length === 0 we need check the type
  // return Object.keys(value).length === 0 && value.constructor === Object;

  return Object.keys(value).length === 0;
}

/**
 * Checks whether a given value is a string containing a numeric value, such that it
 * can be converted to a number.
 *
 * @returns Returns a boolean indicating whether the value is a string containing a numeric value
 */
export function isNumericString(value: any): boolean {
  if (!value) {
    return false;
  }

  return typeof value === "string" && !isNaN(+value) && !isNaN(parseFloat(value));
}

/**
 * Checks whether a given value looks like a number, where something that looks like a
 * number is either an actual number, or a numeric string ([[isNumericString]]). Either way,
 * a number can be derived from the value.
 *
 * @returns Returns a boolean indicating whether the value looks like a number
 */
export function looksLikeNumber(value: any): boolean {
  if (!value) {
    return false;
  }

  return typeof value === "number" || isNumericString(value);
}

/**
 * Checks whether a given value looks like a boolean, where something that looks like a
 * boolean is either an actual boolean, or a string containing the case insensitive text
 * `"true"` or `"false"`. Either way, a boolean can be derived from the value.
 *
 * If string values other than `"true"` or `"false"` are considered valid boolean indicators,
 * then the `acceptedBooleanTokens` parameter can be used to pass in a list of ALL string values
 * that are considered valid boolean indicators, for eg: `["true", "false", "1", "0"]`
 *
 * @param acceptedBooleanTokens A optional list of case insensitive string tokens considered to be
 * valid boolean indicators, the default is `["true", "false"]`
 * @returns Returns a boolean indicating whether the value looks like a boolean
 */
export function looksLikeBoolean(value: any, acceptedBooleanTokens: string[] = ["true", "false"]): boolean {
  if (value === undefined) {
    return false;
  }

  if (typeof value === "boolean") {
    return true;
  }

  if (typeof value !== "string") {
    return false;
  }

  return acceptedBooleanTokens.includes(value.trim().toLocaleLowerCase());
}

/**
 * Checks whether a given value is a primitive, where a primitive is one of:
 * - string
 * - number
 * - boolean
 *
 * @returns Returns a boolean indicating whether the value is a primitive
 */
export function isPrimitive(value: any): boolean {
  if (value === undefined) {
    return false;
  }

  return typeof value === "string" || typeof value === "boolean" || typeof value === "number";
}

/**
 * Shuffles an array, using the algorithm found here:
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 *
 * Note that this changes the order of the array passed that is passed in, and returns that
 * array. This implementation may change in favor of an immutable one, where a copy of the
 * array is created, shuffled and returned, leaving the original one intact.
 *
 * @returns Returns the shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex = undefined;
  let tmpVal = undefined;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tmpVal = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tmpVal;
  }

  return array;
}

/**
 * Creates and returns an array of integer values, ranging from `start` to `end`.
 *
 * @returns Returns the shuffled array
 */
export function integerRange(start: number, end: number): number[] {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
}

/**
 * Creates and returns an array of integer values, ranging from `start` to `end`,
 * of which the values are shuffled into a random order.
 *
 * @returns Returns the shuffled array
 */
export function shuffledIntegerRange(start: number, end: number): number[] {
  return shuffleArray(integerRange(start, end));
}

/**
 * Filters an array of objects such that only unique versions of the objects exist within
 * the new array. A given object instance is considered unique based on the value of an
 * object property that should indicate uniqueness. The function returns a copy of the array
 * where only one instance (the first instance) of a given object with the `uniqueProperty`
 * value exists. For eg:
 *
 * ```javascript
 * const arr = [
 *     { name: "A", size: 12 },
 *     { name: "B", size: 11 },
 *     { name: "C", size: 12 },
 *     { name: "B", size: 15 },
 * ];
 *
 * uniqueObjectArray(arr, "name")
 * uniqueObjectArray(arr, "size")
 * ```
 *
 * Should result, respectively, in:
 *
 * ``` javascript
 * [
 *     { name: "A", size: 12 },
 *     { name: "B", size: 11 },
 *     { name: "C", size: 12 },
 * ]
 * ```
 *
 * and
 *
 *  * ``` javascript
 * [
 *     { name: "A", size: 12 },
 *     { name: "B", size: 11 },
 *     { name: "B", size: 15 },
 * ]
 * ```
 *
 * Or perhaps a more realistic example, to ensure we only have one version of a
 * given person in an array, filter based on their ID number, which should be
 * a unique identifier:
 *
 * ```javascript
 * const people = [
 *     { name: "Andrew", idNumber: "1234" },
 *     { name: "John", idNumber: "4567" },
 *     { name: "Joe", idNumber: "8910" },
 *     { name: "John", idNumber: "4567" },
 * ];
 *
 * uniqueObjectArray(arr, "idNumber")
 * ```
 *
 * Will return a new array where only one version of John exists.
 *
 * @returns Returns the unique object array
 */
export function uniqueObjectArray<T>(arr: T[], uniqueProperty: string): T[] {
  return arr.reduce((accumulator, element) => {
    if (!accumulator.find((el) => el[uniqueProperty] === element[uniqueProperty])) {
      accumulator.push(element);
    }
    return accumulator;
  }, []);
}

/**
 * Convert a value that represents a valid boolean token into a boolean value, where a
 * valid boolean token can be any of:
 * - true or "true"
 * - false or "false"
 * - 1 or "1"
 * - 0 or "0"
 *
 * If the value passed does not represent any valid token, an `Error` will be thrown.
 * Alternatively, to surpress the error and return false instead, pass the `silent`
 * parameter with a value of `true`.
 *
 * @returns Returns the boolean value that the token represents
 */
export function parseBooleanToken(value: any, silent = false): boolean {
  if (!value) {
    return false;
  }

  const v = typeof value === "string" ? value.toLocaleLowerCase() : value;

  switch (v) {
    case true:
    case "true":
    case "1":
    case 1:
      return true;
    case false:
    case "false":
    case "0":
    case 0:
      return false;
    default:
      if (silent) {
        return false;
      } else {
        throw new Error("Invalid boolean token");
      }
  }
}

export interface JsonParseOptions {
  strict?: boolean;
  silent?: boolean;
}

/**
 * A wrapper around `JSON.parse()` with some extra features.
 *
 * If you prefer `undefined` to be returned, instead of throwing an error when failing
 * to parse a JSON string, then pass the option `{ silent: true }`.
 *
 * Further to that, when doing a regular `JSON.parse()`, neither `JSON.parse(false)` nor
 * `JSON.parse(1234)` will result in errors. If you prefer a stricter JSON parse, which would
 * treat those as errors, therefore always expecting either objects or an array of values/objects,
 * then pass the option `{ strict: true }`.
 *
 * Both options can be used, depending on whether you want a strict parse, and/or an error to be
 * thrown, as opposed to `undefined` being returned for a parse failure.
 *
 * @returns Returns the parsed JSON object or array of objects/values
 */
export function parseJson(jsonString: string, options: JsonParseOptions = {}): any | any[] {
  if (options.strict === undefined) {
    options.strict = true;
  }

  try {
    const o = JSON.parse(jsonString);

    if (!options.strict) {
      return o;
    }

    // Neither JSON.parse(false) or JSON.parse(1234) throw errors,
    // hence the type-checking, but... JSON.parse(null) returns null,
    // and typeof null === "object", so we must check for that, too.
    if (o && typeof o === "object") {
      return o;
    }

    return undefined;
  } catch (e) {
    if (options.silent) {
      return undefined;
    }

    throw e;
  }
}

export interface UntypedObject {
  [key: string]: any;
}

export interface HashMap<T> {
  [key: string]: T;
}

/**
 * Creates a lookup map ([[HashMap]]) for a given array of objects, whereby the objects
 * can be looked up by a key, representing a property value that is deemed to be unique
 *
 * @returns HashMap
 */
export function toHashMap<T>(data: T[], uniqueIdProp = "id"): HashMap<T> {
  if (!Array.isArray(data)) {
    return {};
  }

  const map: HashMap<T> = {};

  for (const item of data) {
    if (item[uniqueIdProp]) {
      map[item[uniqueIdProp]] = item;
    }
  }

  return map;
}
