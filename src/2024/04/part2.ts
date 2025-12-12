import assert from 'node:assert'
import fs from 'fs'
import path from 'path'

const puzzle = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8').split('\n')

function solve(input: string[]): number {
  let xmasCount = 0
  input.forEach((line, i) => {
    for (let j = 0; j < line.length; j++) {
      if (line[j] === 'A')
        xmasCount += findXmasDiagonally(j, i < 1 ? null : input[i - 1], i > input.length - 2 ? null : input[i + 1])
    }
  })

  return xmasCount
}

function isXmas(word: string): boolean {
  return word === 'MAS' || word === 'SAM' ? true : false
}

function findXmasDiagonally(fromIndex: number, previousLine: string | null, nextLine: string | null): number {
  if (!previousLine || !nextLine) return 0

  if (fromIndex <= previousLine.length - 2 && fromIndex >= 1) {
    const word1 = previousLine[fromIndex + 1] + 'A' + nextLine[fromIndex - 1]
    const word2 = previousLine[fromIndex - 1] + 'A' + nextLine[fromIndex + 1]
    if (isXmas(word1) && isXmas(word2)) return 1
  }
  return 0
}

assert.equal(solve(puzzle), 9)
