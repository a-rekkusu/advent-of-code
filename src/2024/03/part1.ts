import assert from 'node:assert'
import fs from 'fs'
import path from 'path'

const puzzle = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')

function solve(input: string): number {
  const matches = [...input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)]
  return matches.reduce((acc, matches) => acc + multiply(matches[0]), 0)
}

function multiply(input: string): number {
  const [left, right] = input.split(',')
  return +left.substring(4) * +right.substring(0, right.length - 1)
}

assert.equal(solve(puzzle), 161)
