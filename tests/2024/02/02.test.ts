import { executePart1 } from '../../../src/2024/02/part1'
import { executePart2 } from '../../../src/2024/02/part2'
import { readData } from '../../utils/readFile'

const sampleData = readData(2024, 2)

describe('2024 day 2', () => {
  it('part 1', () => {
    expect(executePart1(sampleData)).toEqual(2)
  })

  it('part 2', () => {
    expect(executePart2(sampleData)).toEqual(4)
  })
})