/* eslint-disable no-prototype-builtins */
// const _ = require("lodash");
import * as lang from "../../src/lang";

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

    const arr = ["a", "b", "c"];

    const obj = {
      name: "Willie",
    };

    const func = function (arg1) {
      console.log(arg1);
    };

    const emptyArr = [];
    const emptyObj = {};

    expect(lang.isDate(date)).toBeTruthy();
    expect(lang.isDate(obj)).toBeFalsy();
    expect(lang.isDate(str)).toBeFalsy();
    expect(lang.isDate(num)).toBeFalsy();
    expect(lang.isDate(bool)).toBeFalsy();

    expect(lang.isObject(obj)).toBeTruthy();
    expect(lang.isObject(emptyObj)).toBeTruthy();
    expect(lang.isObject(date)).toBeTruthy();
    expect(lang.isObject(arr)).toBeFalsy();
    expect(lang.isObject(bool)).toBeFalsy();
    expect(lang.isObject(func)).toBeFalsy();

    expect(lang.isNonDateObject(obj)).toBeTruthy();
    expect(lang.isNonDateObject(emptyObj)).toBeTruthy();
    expect(lang.isNonDateObject(date)).toBeFalsy();

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

  test("Parse JSON object", () => {
    expect.assertions(9);

    const goodJson = '{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}';
    const badJson = '{"a":"obja""b":[0,1,2],"c":{"d":"some object"}}';
    const strNumber = "121212";

    expect(lang.parseJsonObject(goodJson)).toEqual(
      expect.objectContaining({ a: "obja", b: [0, 1, 2], c: { d: "some object" } })
    );

    expect(lang.parseJsonObject(strNumber)).toBeUndefined();
    expect(lang.parseJsonObject(strNumber, { strict: false })).toEqual(121212);

    expect(lang.parseJsonObject(strNumber, { silent: true })).toBeUndefined();
    expect(lang.parseJsonObject(strNumber, { strict: false, silent: true })).toEqual(121212);

    expect(lang.parseJsonObject(badJson, { silent: true })).toBeUndefined();
    expect(lang.parseJsonObject(badJson, { strict: false, silent: true })).toBeUndefined();

    try {
      lang.parseJsonObject(badJson);
    } catch (e) {
      expect(e).toBeDefined();
    }

    try {
      lang.parseJsonObject(badJson, { strict: false });
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

    for (const item of arr1) {
      console.log(item);
    }

    for (const item of arr2) {
      console.log(item);
    }
  });

  test("Integer range", () => {
    console.log(lang.integerRange(9, 18));
    console.log(lang.randomIntegerRange(9, 18));
    console.log(lang.randomIntegerRange(0, 7));
    console.log(lang.randomIntegerRange(0, 11));
    console.log(lang.randomIntegerRange(1, 8));
  });
});
