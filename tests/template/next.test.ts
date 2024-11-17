import fs from 'fs'
import path from 'path'
import { execute as executePart1 } from '../../src/template/part1'
import { execute as executePart2 } from '../../src/template/part2'

const sampleData = fs
  .readFileSync(path.resolve(__dirname, 'sampleData.txt'), 'utf8')
  .split('\n')

const puzzleData = fs
  .readFileSync(path.resolve(__dirname, 'puzzleData.txt'), 'utf8')
  .split('\n')

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
