import { calculateGameIdsSumAndPowers } from '../../src/day2'
import { puzzleData, sampleData } from './testData'

describe('part 1', () => {
  it('sample data', () => {
    const { gameIdsSum } = calculateGameIdsSumAndPowers(sampleData)
    expect(gameIdsSum).toEqual(8)
  })

  it('puzzle data', () => {
    const { gameIdsSum } = calculateGameIdsSumAndPowers(puzzleData)
    expect(gameIdsSum).toEqual(2600)
  })
})

describe('part 2', () => {
  it('sample data', () => {
    const { minimumCubePowers } = calculateGameIdsSumAndPowers(sampleData)
    expect(minimumCubePowers).toEqual(2286)
  })

  it('puzzle data', () => {
    const { minimumCubePowers } = calculateGameIdsSumAndPowers(puzzleData)
    expect(minimumCubePowers).toEqual(86036)
  })
})
