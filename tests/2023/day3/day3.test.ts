import fs from 'fs'
import path from 'path'
import { execute as executePart1 } from '../../../src/2023/day3/part1'
import { execute as executePart2 } from '../../../src/2023/day3/part2'

const sampleData = fs
  .readFileSync(path.resolve(__dirname, 'sampleData.txt'), 'utf8')
  .split('\n')

describe('day 3', () => {
  describe('part 1', () => {
    it('sample data', () => {
      expect(executePart1(sampleData)).toEqual(4361)
    })
  })

  describe('part 2', () => {
    it('sample data', () => {
      expect(executePart2(sampleData)).toEqual(467835)
    })
  })
})
