import { calculateGameIdsSumAndPowers } from '../../../src/2023/day2'
import {  sampleData } from './testData'

describe('part 1', () => {
  it('sample data', () => {
    const { gameIdsSum } = calculateGameIdsSumAndPowers(sampleData)
    expect(gameIdsSum).toEqual(8)
  })
})

describe('part 2', () => {
  it('sample data', () => {
    const { minimumCubePowers } = calculateGameIdsSumAndPowers(sampleData)
    expect(minimumCubePowers).toEqual(2286)
  })
})
