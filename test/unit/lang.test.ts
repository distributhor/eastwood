/* eslint-disable no-prototype-builtins */
// const _ = require("lodash");
import * as lang from "../../src/lang";

class Person {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  hello() {
    console.log(`Hello ${this.name}`);
  }
}

describe("Wild West Tests", () => {
  test("Equality", () => {
    const str = "string";

    const num = 76;
    const numStr = "76";

    const bool = false;
    const boolStr1 = "false";
    const boolStr2 = "TRUE";

    const one = 1;
    const zero = 0;
    const oneStr = "1";
    const zeroStr = "0";
    const twoStr = "2";

    const date = new Date();
    const person = new Person("ASDF");
    const pet = new Object({
      name: "spot",
      hello: function () {
        console.log(`Woof ${this.name}`);
      },
    });

    const arr = ["a", "b", "c"];

    const obj = {
      name: "XYZ",
    };

    const emptyArr = [];
    const emptyObj = {};

    const func = function (arg1: string) {
      console.log(arg1);
    };

    expect(lang.isEmptyObject(obj)).toBeFalsy();
    expect(lang.isEmptyObject(date)).toBeFalsy();
    expect(lang.isEmptyObject(person)).toBeFalsy();
    expect(lang.isEmptyObject(emptyArr)).toBeFalsy();
    expect(lang.isEmptyObject(emptyObj)).toBeTruthy();

    expect(lang.isObject(obj)).toBeTruthy();
    expect(lang.isObjectLiteral(obj)).toBeTruthy();
    expect(lang.isDataObject(obj)).toBeTruthy();

    expect(lang.isObject(emptyObj)).toBeTruthy();
    expect(lang.isObjectLiteral(emptyObj)).toBeTruthy();
    expect(lang.isDataObject(emptyObj)).toBeTruthy();

    expect(lang.isObject(date)).toBeTruthy();
    expect(lang.isObjectLiteral(date)).toBeFalsy();
    expect(lang.isDataObject(date)).toBeFalsy();

    expect(lang.isObject(person)).toBeTruthy();
    expect(lang.isObjectLiteral(person)).toBeFalsy();
    expect(lang.isDataObject(person)).toBeFalsy();

    expect(lang.isObject(pet)).toBeTruthy();
    expect(lang.isObjectLiteral(pet)).toBeTruthy();
    expect(lang.isDataObject(pet)).toBeFalsy();

    expect(lang.isObject(bool)).toBeFalsy();
    expect(lang.isObject(func)).toBeFalsy();

    expect(lang.isObject(arr)).toBeFalsy();
    expect(lang.isObjectLiteral(arr)).toBeFalsy();
    expect(typeof arr === "object").toBeTruthy();
    expect(typeof emptyArr === "object").toBeTruthy();

    expect({}).toBeTruthy();
    expect([]).toBeTruthy();

    expect(lang.looksLikeNumber(num)).toBeTruthy();
    expect(lang.looksLikeNumber(numStr)).toBeTruthy();
    expect(lang.looksLikeNumber(str)).toBeFalsy();
    expect(lang.looksLikeNumber(obj)).toBeFalsy();
    expect(lang.looksLikeNumber(arr)).toBeFalsy();
    expect(lang.looksLikeNumber(bool)).toBeFalsy();

    expect(lang.looksLikeBoolean(bool)).toBeTruthy();
    expect(lang.looksLikeBoolean(boolStr1)).toBeTruthy();
    expect(lang.looksLikeBoolean(boolStr2)).toBeTruthy();
    expect(lang.looksLikeBoolean(zero)).toBeFalsy();
    expect(lang.looksLikeBoolean(one)).toBeFalsy();
    expect(lang.looksLikeBoolean(zeroStr)).toBeFalsy();
    expect(lang.looksLikeBoolean(oneStr)).toBeFalsy();
    expect(lang.looksLikeBoolean(twoStr)).toBeFalsy();
    expect(lang.looksLikeBoolean(zeroStr, ["1", "0"])).toBeTruthy();
    expect(lang.looksLikeBoolean(oneStr, ["1", "0"])).toBeTruthy();
    expect(lang.looksLikeBoolean(twoStr, ["1", "0"])).toBeFalsy();
    expect(lang.looksLikeBoolean(num)).toBeFalsy();
    expect(lang.looksLikeBoolean(str)).toBeFalsy();
    expect(lang.looksLikeBoolean(obj)).toBeFalsy();
    expect(lang.looksLikeBoolean(arr)).toBeFalsy();

    expect(lang.isPrimitive(num)).toBeTruthy();
    expect(lang.isPrimitive(numStr)).toBeTruthy();
    expect(lang.isPrimitive(bool)).toBeTruthy();
    expect(lang.isPrimitive(boolStr1)).toBeTruthy();
    expect(lang.isPrimitive(str)).toBeTruthy();
    expect(lang.isPrimitive(obj)).toBeFalsy();
    expect(lang.isPrimitive(arr)).toBeFalsy();
    expect(lang.isPrimitive(date)).toBeFalsy();
  });

  test("Parse boolean token", () => {
    expect.assertions(20);

    expect(lang.parseBooleanToken(true)).toEqual(true);
    expect(lang.parseBooleanToken("true")).toEqual(true);
    expect(lang.parseBooleanToken("1")).toEqual(true);
    expect(lang.parseBooleanToken(1)).toEqual(true);
    expect(lang.parseBooleanToken(0)).toEqual(false);
    expect(lang.parseBooleanToken("0")).toEqual(false);
    expect(lang.parseBooleanToken("false")).toEqual(false);
    expect(lang.parseBooleanToken(false)).toEqual(false);

    try {
      lang.parseBooleanToken("invalid-boolen-token");
    } catch (e) {
      expect(e).toBeDefined();
    }

    try {
      lang.parseBooleanToken("2");
    } catch (e) {
      expect(e).toBeDefined();
    }

    expect(lang.parseBooleanToken("invalid-boolen-token", true)).toEqual(false);
    expect(lang.parseBooleanToken("2", true)).toEqual(false);

    expect(lang.parseBooleanToken(true, true)).toEqual(true);
    expect(lang.parseBooleanToken("true", true)).toEqual(true);
    expect(lang.parseBooleanToken("1", true)).toEqual(true);
    expect(lang.parseBooleanToken(1, true)).toEqual(true);
    expect(lang.parseBooleanToken(0, true)).toEqual(false);
    expect(lang.parseBooleanToken("0", true)).toEqual(false);
    expect(lang.parseBooleanToken("false", true)).toEqual(false);
    expect(lang.parseBooleanToken(false, true)).toEqual(false);
  });

  test("Parse JSON", () => {
    expect.assertions(9);

    const goodJson = '{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}';
    const badJson = '{"a":"obja""b":[0,1,2],"c":{"d":"some object"}}';
    const strNumber = "121212";

    expect(lang.parseJson(goodJson)).toEqual(
      expect.objectContaining({ a: "obja", b: [0, 1, 2], c: { d: "some object" } })
    );

    expect(lang.parseJson(strNumber)).toBeUndefined();
    expect(lang.parseJson(strNumber, { strict: false })).toEqual(121212);

    expect(lang.parseJson(strNumber, { silent: true })).toBeUndefined();
    expect(lang.parseJson(strNumber, { strict: false, silent: true })).toEqual(121212);

    expect(lang.parseJson(badJson, { silent: true })).toBeUndefined();
    expect(lang.parseJson(badJson, { strict: false, silent: true })).toBeUndefined();

    try {
      lang.parseJson(badJson);
    } catch (e) {
      expect(e).toBeDefined();
    }

    try {
      lang.parseJson(badJson, { strict: false });
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("Shuffle array", () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [
      { name: "A", id: 1 },
      { name: "B", id: 2 },
      { name: "C", id: 3 },
      { name: "D", id: 4 },
      { name: "E", id: 5 },
    ];

    lang.shuffleArray(arr1);
    lang.shuffleArray(arr2);

    // for (const item of arr1) {
    //   console.log(item);
    // }

    // for (const item of arr2) {
    //   console.log(item);
    // }
  });

  test("Integer range", () => {
    console.log(lang.integerRange(9, 18));
    // console.log(lang.randomIntegerRange(9, 18));
    // console.log(lang.randomIntegerRange(0, 7));
    // console.log(lang.randomIntegerRange(0, 11));
    // console.log(lang.randomIntegerRange(1, 8));
  });

  test("Unique object array", () => {
    const arr = [
      { name: "A", size: 12 },
      { name: "B", size: 11 },
      { name: "C", size: 15 },
      { name: "D", size: 16 },
      { name: "B", size: 19 },
      { name: "E", size: 11 },
    ];

    // { name: "B", size: 19 } should be missing
    expect(lang.uniqueObjectArray(arr, "name")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "A", size: 12 }),
        expect.objectContaining({ name: "B", size: 11 }),
        expect.objectContaining({ name: "C", size: 15 }),
        expect.objectContaining({ name: "D", size: 16 }),
        expect.objectContaining({ name: "E", size: 11 }),
      ])
    );

    // { name: "E", size: 11 } should be missing
    expect(lang.uniqueObjectArray(arr, "size")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "A", size: 12 }),
        expect.objectContaining({ name: "B", size: 11 }),
        expect.objectContaining({ name: "C", size: 15 }),
        expect.objectContaining({ name: "D", size: 16 }),
        expect.objectContaining({ name: "B", size: 19 }),
      ])
    );
  });
});
