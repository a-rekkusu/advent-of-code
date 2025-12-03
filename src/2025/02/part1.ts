import fs from 'fs'
import path from 'path'

const puzzle = fs
  .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
  .split(',')

type Range = { min: number; max: number }

const ranges: Range[] = puzzle.map((range) => {
  const [min, max] = range.split('-')
  return { min: Number(min), max: Number(max) }
})

function isIdInvalid(value: number): boolean {
  const valueAsString = String(value)
  const startIndexSecondHalf = valueAsString.length / 2
  const secondHalf = valueAsString.substring(startIndexSecondHalf)
  const firstHalf = valueAsString.substring(0, startIndexSecondHalf)
  return secondHalf === firstHalf
}

function isEvenSplittableNumber(value: number): boolean {
  return String(value).length % 2 === 0
}

let result = 0

ranges.forEach((range) => {
  for (let i = range.min; i <= range.max; i++) {
    if (isEvenSplittableNumber(i) && isIdInvalid(i)) result += i
  }
})

console.log(result)