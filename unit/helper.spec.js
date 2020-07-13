import { getInitDate, replaceLastPopFirst, getObjectFromArray, defaultDataSetConfig, addIfNotExist } from '../src/utils/helper'

describe('Helpers', () => {
  // Mock test is required so that jest does not complain we have no tests on job.
  it('Test Get Moment Date', () => {
    const arr = getInitDate(5)
    expect(arr.length).toBe(5)
  })

  it('Test replace Last', () => {
    const newArray = replaceLastPopFirst(['4', '5', '8'], '3')
    expect(newArray).toEqual(['5', '8', '3'])
  })

  it('Should test addIfNotExit', () => {
    const arr1 = addIfNotExist(['cpu'], 'cpu')
    expect(arr1).toEqual(['cpu'])
    const arr2 = addIfNotExist(['cpu'], 'tail')
    expect(arr2).toEqual(['cpu', 'tail'])
    const arr3 = addIfNotExist(['cpu'], ['cpu', 'tail'])
    expect(arr3).toEqual(['cpu', 'tail'])
  })

  it('Should test getObjectFromArray', () => {
    const testObj = {
      label: 'cpu.0',
      ...defaultDataSetConfig(),
    }
    const obj1 = getObjectFromArray([testObj], 'cpu.0')
    expect(obj1).toEqual(testObj)
    const obj2 = getObjectFromArray([testObj], 'cpu.1')
    expect(obj2).toBe(false)
  })
})
