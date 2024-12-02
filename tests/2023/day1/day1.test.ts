import { calculateSum } from '../../../src/2023/day1'
import { sampleData  } from './testData'

it('sample data test', () => {
  expect(calculateSum(sampleData)).toEqual(281)
})
