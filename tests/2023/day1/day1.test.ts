import { calculateSum } from '../../../src/2023/day1'
import { sampleData, puzzleData } from './testData'

it('sample data test', () => {
  expect(calculateSum(sampleData)).toEqual(281)
})

it('puzzle data test', () => {
  expect(calculateSum(puzzleData)).toEqual(53340)
})
