/* eslint-disable no-new-object */
/* eslint-disable no-prototype-builtins */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// const _ = require("lodash");
import * as lang from '../src/lang'

interface Human {
  name?: string
  surname?: string
  age?: number
}

class Person {
  public name: string | undefined
  public surname: string | undefined
  public age: number | undefined
  constructor(name?: string, surname?: string, age?: number) {
    this.name = name
    this.surname = surname
    this.age = age
  }

  hello() {
    console.log(`Hello ${this.name}`)
  }
}

describe('Wild West Tests', () => {
  test('Equality', () => {
    const str = 'string'

    const num = 76
    const numStr = '76'

    const bool = false
    const boolStr1 = 'false'
    const boolStr2 = 'TRUE'

    const one = 1
    const zero = 0
    const oneStr = '1'
    const zeroStr = '0'
    const twoStr = '2'

    const arr = ['a', 'b', 'c']

    const obj = {
      name: 'XYZ'
    }

    const emptyArr = []
    const emptyObj = {}
    const emptyObj2 = Object.create({})

    const date = new Date()
    const person = new Person('ASDF')
    const emptyPerson = new Person()
    const emptyPet1 = new Object()
    const emptyPet2 = new Object({})
    const pet = new Object({
      name: 'spot',
      hello: function () {
        console.log(`Woof ${this.name}`)
      }
    })

    const petData1 = {
      name: 'spot'
    }

    const petData2 = new Object({
      name: 'spot'
    })

    const func = function (arg1: string) {
      console.log(arg1)
    }

    expect(lang.isObject(obj)).toBeTruthy()
    expect(lang.isPlainObject(obj)).toBeTruthy()
    expect(lang.isDataObject(obj)).toBeTruthy()

    expect(lang.isObject(emptyObj)).toBeTruthy()
    expect(lang.isPlainObject(emptyObj)).toBeTruthy()
    expect(lang.isDataObject(emptyObj)).toBeTruthy()

    expect(lang.isObject(date)).toBeTruthy()
    expect(lang.isPlainObject(date)).toBeFalsy()
    expect(lang.isDataObject(date)).toBeFalsy()

    expect(lang.isObject(person)).toBeTruthy()
    expect(lang.isPlainObject(person)).toBeFalsy()
    expect(lang.isDataObject(person)).toBeFalsy()

    expect(lang.isObject(pet)).toBeTruthy()
    expect(lang.isPlainObject(pet)).toBeTruthy()
    expect(lang.isDataObject(pet)).toBeFalsy()
    expect(lang.isDataObject(petData1)).toBeTruthy()
    expect(lang.isDataObject(petData2)).toBeTruthy()

    expect(lang.isObject(bool)).toBeFalsy()
    expect(lang.isObject(func)).toBeFalsy()

    expect(lang.isObject(arr)).toBeFalsy()
    expect(lang.isPlainObject(arr)).toBeFalsy()
    expect(typeof arr === 'object').toBeTruthy()
    expect(typeof emptyArr === 'object').toBeTruthy()

    expect({}).toBeTruthy()
    expect([]).toBeTruthy()

    expect(lang.isEmptyObject(obj)).toBeFalsy()
    expect(lang.isEmptyObject(date)).toBeFalsy()
    expect(lang.isEmptyObject(person)).toBeFalsy()
    expect(lang.isEmptyObject(emptyArr)).toBeFalsy()
    expect(lang.isEmptyObject(emptyPerson)).toBeFalsy()
    expect(lang.isEmptyObject(emptyObj)).toBeTruthy()
    expect(lang.isEmptyObject(emptyObj2)).toBeTruthy()
    expect(lang.isEmptyObject(emptyPet1)).toBeTruthy()
    expect(lang.isEmptyObject(emptyPet2)).toBeTruthy()

    expect(lang.looksLikeNumber(num)).toBeTruthy()
    expect(lang.looksLikeNumber(numStr)).toBeTruthy()
    expect(lang.looksLikeNumber(str)).toBeFalsy()
    expect(lang.looksLikeNumber(obj)).toBeFalsy()
    expect(lang.looksLikeNumber(arr)).toBeFalsy()
    expect(lang.looksLikeNumber(bool)).toBeFalsy()

    expect(lang.looksLikeBoolean(bool)).toBeTruthy()
    expect(lang.looksLikeBoolean(boolStr1)).toBeTruthy()
    expect(lang.looksLikeBoolean(boolStr2)).toBeTruthy()
    expect(lang.looksLikeBoolean(zero)).toBeFalsy()
    expect(lang.looksLikeBoolean(one)).toBeFalsy()
    expect(lang.looksLikeBoolean(zeroStr)).toBeFalsy()
    expect(lang.looksLikeBoolean(oneStr)).toBeFalsy()
    expect(lang.looksLikeBoolean(twoStr)).toBeFalsy()
    expect(lang.looksLikeBoolean(zeroStr, ['1', '0'])).toBeTruthy()
    expect(lang.looksLikeBoolean(oneStr, ['1', '0'])).toBeTruthy()
    expect(lang.looksLikeBoolean(twoStr, ['1', '0'])).toBeFalsy()
    expect(lang.looksLikeBoolean(num)).toBeFalsy()
    expect(lang.looksLikeBoolean(str)).toBeFalsy()
    expect(lang.looksLikeBoolean(obj)).toBeFalsy()
    expect(lang.looksLikeBoolean(arr)).toBeFalsy()

    expect(lang.isPrimitive(num)).toBeTruthy()
    expect(lang.isPrimitive(numStr)).toBeTruthy()
    expect(lang.isPrimitive(bool)).toBeTruthy()
    expect(lang.isPrimitive(boolStr1)).toBeTruthy()
    expect(lang.isPrimitive(str)).toBeTruthy()
    expect(lang.isPrimitive(obj)).toBeFalsy()
    expect(lang.isPrimitive(arr)).toBeFalsy()
    expect(lang.isPrimitive(date)).toBeFalsy()
  })

  test('Parse boolean token', () => {
    expect.assertions(20)

    expect(lang.parseBooleanToken(true)).toEqual(true)
    expect(lang.parseBooleanToken('true')).toEqual(true)
    expect(lang.parseBooleanToken('1')).toEqual(true)
    expect(lang.parseBooleanToken(1)).toEqual(true)
    expect(lang.parseBooleanToken(0)).toEqual(false)
    expect(lang.parseBooleanToken('0')).toEqual(false)
    expect(lang.parseBooleanToken('false')).toEqual(false)
    expect(lang.parseBooleanToken(false)).toEqual(false)

    try {
      lang.parseBooleanToken('invalid-boolen-token')
    } catch (e) {
      expect(e).toBeDefined()
    }

    try {
      lang.parseBooleanToken('2')
    } catch (e) {
      expect(e).toBeDefined()
    }

    expect(lang.parseBooleanToken('invalid-boolen-token', true)).toEqual(false)
    expect(lang.parseBooleanToken('2', true)).toEqual(false)

    expect(lang.parseBooleanToken(true, true)).toEqual(true)
    expect(lang.parseBooleanToken('true', true)).toEqual(true)
    expect(lang.parseBooleanToken('1', true)).toEqual(true)
    expect(lang.parseBooleanToken(1, true)).toEqual(true)
    expect(lang.parseBooleanToken(0, true)).toEqual(false)
    expect(lang.parseBooleanToken('0', true)).toEqual(false)
    expect(lang.parseBooleanToken('false', true)).toEqual(false)
    expect(lang.parseBooleanToken(false, true)).toEqual(false)
  })

  test('Parse JSON', () => {
    expect.assertions(9)

    const goodJson = '{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}'
    const badJson = '{"a":"obja""b":[0,1,2],"c":{"d":"some object"}}'
    const strNumber = '121212'

    expect(lang.parseJson(goodJson)).toEqual(
      expect.objectContaining({ a: 'obja', b: [0, 1, 2], c: { d: 'some object' } })
    )

    expect(lang.parseJson(strNumber)).toBeUndefined()
    expect(lang.parseJson(strNumber, { strict: false })).toEqual(121212)

    expect(lang.parseJson(strNumber, { silent: true })).toBeUndefined()
    expect(lang.parseJson(strNumber, { strict: false, silent: true })).toEqual(121212)

    expect(lang.parseJson(badJson, { silent: true })).toBeUndefined()
    expect(lang.parseJson(badJson, { strict: false, silent: true })).toBeUndefined()

    try {
      lang.parseJson(badJson)
    } catch (e) {
      expect(e).toBeDefined()
    }

    try {
      lang.parseJson(badJson, { strict: false })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  test('Shuffle array', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [
      { name: 'A', id: 1 },
      { name: 'B', id: 2 },
      { name: 'C', id: 3 },
      { name: 'D', id: 4 },
      { name: 'E', id: 5 }
    ]

    lang.shuffleArray(arr1)
    lang.shuffleArray(arr2)
  })

  test('Integer range', () => {
    expect(lang.integerRange(9, 14)).toEqual(expect.arrayContaining([9, 10, 11, 12, 13, 14]))
    // console.log(lang.shuffledIntegerRange(9, 18));
    // console.log(lang.shuffledIntegerRange(0, 7));
    // console.log(lang.shuffledIntegerRange(0, 11));
    // console.log(lang.shuffledIntegerRange(1, 8));
  })

  test('Unique object array', () => {
    const arr = [
      { name: 'A', size: 12 },
      { name: 'B', size: 11 },
      { name: 'C', size: 15 },
      { name: 'D', size: 16 },
      { name: 'B', size: 19 },
      { name: 'E', size: 11 }
    ]

    // { name: "B", size: 19 } should be missing
    expect(lang.uniqueObjectArray(arr, 'name')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'A', size: 12 }),
        expect.objectContaining({ name: 'B', size: 11 }),
        expect.objectContaining({ name: 'C', size: 15 }),
        expect.objectContaining({ name: 'D', size: 16 }),
        expect.objectContaining({ name: 'E', size: 11 })
      ])
    )

    // { name: "E", size: 11 } should be missing
    expect(lang.uniqueObjectArray(arr, 'size')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'A', size: 12 }),
        expect.objectContaining({ name: 'B', size: 11 }),
        expect.objectContaining({ name: 'C', size: 15 }),
        expect.objectContaining({ name: 'D', size: 16 }),
        expect.objectContaining({ name: 'B', size: 19 })
      ])
    )
  })

  test('HashMap', () => {
    const people1: Human[] = [
      { name: 'John', surname: 'Doe', age: 20 },
      { name: 'John', surname: 'Foo', age: 40 },
      { name: 'Joe', surname: 'Soap', age: 30 },
      { name: 'Jan', surname: 'Doe', age: 40 }
    ]

    const people2: Person[] = [
      new Person('John', 'Doe', 20),
      new Person('John', 'Foo', 40),
      new Person('Joe', 'Soap', 30),
      new Person('Jan', 'Doe', 40)
    ]

    const result1 = lang.toHashMap(people1, 'name')
    const result2 = lang.toHashMap(people1, 'surname')
    const result3 = lang.toHashMap(people1, 'age')
    const result4 = lang.toHashMap(people2, 'name')
    const result5 = lang.toHashMap(people2, 'surname')
    const result6 = lang.toHashMap(people2, 'age')

    expect(result1).toEqual(
      expect.objectContaining({
        John: { name: 'John', surname: 'Foo', age: 40 },
        Joe: { name: 'Joe', surname: 'Soap', age: 30 },
        Jan: { name: 'Jan', surname: 'Doe', age: 40 }
      })
    )

    expect(result1.John.surname).toEqual('Foo')
    expect(result4.John.surname).toEqual('Foo')
    expect(result1.John instanceof Object).toBeTruthy()
    expect(result1.John instanceof Person).toBeFalsy()
    expect(result4.John instanceof Person).toBeTruthy()

    expect(result2).toEqual(
      expect.objectContaining({
        Doe: { name: 'Jan', surname: 'Doe', age: 40 },
        Foo: { name: 'John', surname: 'Foo', age: 40 },
        Soap: { name: 'Joe', surname: 'Soap', age: 30 }
      })
    )

    expect(result2.Soap.name).toEqual('Joe')
    expect(result5.Soap.name).toEqual('Joe')
    expect(result2.Soap instanceof Object).toBeTruthy()
    expect(result2.Soap instanceof Person).toBeFalsy()
    expect(result5.Soap instanceof Person).toBeTruthy()

    expect(result3).toEqual(
      expect.objectContaining({
        20: { name: 'John', surname: 'Doe', age: 20 },
        30: { name: 'Joe', surname: 'Soap', age: 30 },
        40: { name: 'Jan', surname: 'Doe', age: 40 }
      })
    )

    expect(result3['40'].name).toEqual('Jan')
    expect(result6['40'].name).toEqual('Jan')
    expect(result3['40'] instanceof Object).toBeTruthy()
    expect(result3['40'] instanceof Person).toBeFalsy()
    expect(result6['40'] instanceof Person).toBeTruthy()
  })
})
