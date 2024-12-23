import { executePart1 } from '../../../src/2024/01/part1'
import { executePart2 } from '../../../src/2024/01/part2'
import { readData } from '../../utils/readFile'

const sampleData = readData(2024, 1)

describe('2024 day 1', () => {
  describe('part 1', () => {
    it('sample data', () => {
      expect(executePart1(sampleData)).toEqual(11)
    })
  })

  describe('part 2', () => {
    it('sample data', () => {
      expect(executePart2(sampleData)).toEqual(31)
    })
  })
})
