import fs from 'fs'
import path from 'path'
import { execute as executePart1 } from '../../../src/2023/day5/part1'
import { execute as executePart2 } from '../../../src/2023/day5/part2'

const sampleData = fs
  .readFileSync(path.resolve(__dirname, 'sampleData.txt'), 'utf8')
  .split('\n')

describe.skip('day 5 ', () => {
  describe('part 1', () => {
    it('sample data', () => {
      expect(executePart1(sampleData)).toEqual(35)
    })
  })

  describe('part 2', () => {
    it('sample data', () => {
      expect(executePart2(sampleData)).toEqual(46)
    })
  })
})
