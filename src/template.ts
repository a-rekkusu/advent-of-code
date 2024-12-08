import assert from 'node:assert'
import fs from 'fs'
import path from 'path'

const puzzle = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8').split('\n')

function solve(input: string[]): number {
    return 0
}

assert.equal(solve(puzzle), 0)