import fs from 'fs'
import path from 'path'

const startTime = performance.now()

const puzzle = fs
  .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
  .split(',')

type Range = { min: number; max: number }

const ranges: Range[] = puzzle.map((range) => {
  const [min, max] = range.split('-')
  return { min: Number(min), max: Number(max) }
})

function getTimesSubstringFits(target: string, substring: string): number {
  return Math.floor(target.length / substring.length)
}

function doesSubstringFitExactlyXTimes(
  target: string,
  substring: string,
  times: number
): boolean {
  let startIndex = 0
  const sequences: string[] = []

  for (let i = times; i > 0; i--) {
    const sequence = target.substring(startIndex, startIndex + substring.length)
    sequences.push(sequence)
    startIndex += substring.length
  }

  const totalLengthOfSequences = sequences.reduce(
    (acc, sequence) => acc + sequence.length,
    0
  )
  if (totalLengthOfSequences !== target.length) return false

  const sameSequences = Array.from(new Set(sequences))
  return sameSequences.length === 1
}

function isIdInvalid(value: number): boolean {
  const valueAsString = String(value)
  const startIndex = Math.floor(valueAsString.length / 2)

  for (let i = startIndex; i > 0; i--) {
    const substring = valueAsString.substring(0, i)
    const timesSubstringFits = getTimesSubstringFits(
      valueAsString,
      valueAsString.substring(0, i)
    )

    if (
      doesSubstringFitExactlyXTimes(
        valueAsString,
        substring,
        timesSubstringFits
      )
    )
      return true
  }

  return false
}

let result = 0

ranges.forEach((range) => {
  for (let i = range.min; i <= range.max; i++) {
    if (isIdInvalid(i)) {
      result += i
    }
  }
})

const endTime = performance.now()
console.log(`runtime: ${endTime - startTime} ms`)
console.log(result)
