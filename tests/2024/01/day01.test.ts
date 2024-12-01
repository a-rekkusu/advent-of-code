import { executePart1 } from '../../../src/2024/01/part1'
import { readData } from '../../utils/readFile'

const { sampleData, puzzleData } = readData(2024, 1)

describe.only('2024 day 1', () => {
  describe('part 1', () => {
    it('sample data', () => {
      expect(executePart1(sampleData)).toEqual(11)
    })

    it.skip('puzzle data', () => {
      expect(executePart1(puzzleData)).toEqual(0)
    })
  })
})
