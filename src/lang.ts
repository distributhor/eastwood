/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function isObject(value: any): boolean {
  if (!value) {
    return false;
  }

  if (typeof value === "object") {
    return !Array.isArray(value);
  }

  return false;
}

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

export function isDataObject(value: any): boolean {
  if (!value || !isPlainObject(value)) {
    return false;
  }

  return Object.keys(value).filter((k) => typeof value[k] === "function").length === 0;
}

export function isEmptyObject(value: any): boolean {
  if (!value || !isPlainObject(value)) {
    return false;
  }

  // changed the initial check from isObject to isPlainObject, simplifying the return statement
  // because Object.keys(new Date()).length === 0 we need check the type
  // return Object.keys(value).length === 0 && value.constructor === Object;

  return Object.keys(value).length === 0;
}

export function isNumericString(value: any): boolean {
  if (!value) {
    return false;
  }

  return typeof value === "string" && !isNaN(+value) && !isNaN(parseFloat(value));
}

export function looksLikeNumber(value: any): boolean {
  if (!value) {
    return false;
  }

  return typeof value === "number" || isNumericString(value);
}

export function looksLikeBoolean(value: any, acceptedBooleanStrings: string[] = ["true", "false"]): boolean {
  if (value === undefined) {
    return false;
  }

  if (typeof value === "boolean") {
    return true;
  }

  if (typeof value !== "string") {
    return false;
  }

  return acceptedBooleanStrings.includes(value.trim().toLocaleLowerCase());
}

export function isPrimitive(value: any): boolean {
  if (value === undefined) {
    return false;
  }

  return typeof value === "string" || typeof value === "boolean" || typeof value === "number";
}

export function shuffleArray<T>(array: T[]): T[] {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let currentIndex = array.length;
  let randomIndex = undefined;
  let tmpVal = undefined;

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tmpVal = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tmpVal;
  }

  return array;
}

export function integerRange(start: number, end: number): number[] {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
}

export function randomIntegerRange(start: number, end: number): number[] {
  return shuffleArray(integerRange(start, end));
}

export function uniqueObjectArray<T>(arr: T[], uniquePropertyName: string): T[] {
  return arr.reduce((accumulator, element) => {
    if (!accumulator.find((el) => el[uniquePropertyName] === element[uniquePropertyName])) {
      accumulator.push(element);
    }
    return accumulator;
  }, []);
}

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
        throw "Invalid boolean token";
      }
  }
}

export interface JsonParseOptions {
  strict?: boolean;
  silent?: boolean;
}

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
