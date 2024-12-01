import { executePart1 } from '../../src/template/part1'
import { executePart2 } from '../../src/template/part2'
import { readData } from '../utils/readFile'

const { sampleData, puzzleData } = readData(2024, 0o1)

describe('template', () => {
  describe('part 1', () => {
    it('sample data', () => {
      expect(executePart1(sampleData)).toEqual(0)
    })

    it('puzzle data', () => {
      expect(executePart1(puzzleData)).toEqual(0)
    })
  })

  describe('template', () => {
    it('sample data', () => {
      expect(executePart2(sampleData)).toEqual(0)
    })

    it('puzzle data', () => {
      expect(executePart2(puzzleData)).toEqual(0)
    })
  })
})
