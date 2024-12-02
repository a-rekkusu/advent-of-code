import { executePart1 } from '../../../src/2024/02/part1'
import { readData } from '../../utils/readFile'

const sampleData = readData(2024, 2)

describe('2024 day 2', () => {
    describe('part 1', () => {
      it('sample data', () => {
        expect(executePart1(sampleData)).toEqual(2)
      })
    })
})  