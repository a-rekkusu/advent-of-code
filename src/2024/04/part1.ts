import assert from 'node:assert'
import fs from 'fs'
import path from 'path'

const puzzle = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8').split('\n')

function solve(input: string[]): number {
    let xmasCount = 0
    input.forEach((line, i) => {
        for (let j = 0; j < line.length; j++) {
            if (line[j] === ('X')) xmasCount += searchXmas(j, line, 
                i < 3 ? [] : [input[i - 1], input[i - 2], input[i - 3]], 
                i > input.length - 4 ? [] : [input[i + 1], input[i + 2], input [i + 3]])
        }
    })

    return xmasCount 
}

function searchXmas(fromIndex: number, line: string, previousLines: string[], nextLines: string[]): number {
    let foundXmas = 0
    foundXmas += findForwards(fromIndex, line)
    foundXmas += findBackwards(fromIndex, line)
    foundXmas += findVertically(fromIndex, previousLines)
    foundXmas += findVertically(fromIndex, nextLines)
    foundXmas += findDiagonally(fromIndex, previousLines)
    foundXmas += findDiagonally(fromIndex, nextLines)

    return foundXmas
}

function findForwards(fromIndex: number, line: string): number { 
    if (fromIndex > line.length - 5) return 0
    if (line.substring(fromIndex, fromIndex + 4) === 'XMAS') return 1  
    return 0
}   

function findBackwards(fromIndex: number, line: string): number { 
    if (fromIndex < 3) return 0
    if (line.substring(fromIndex - 3, fromIndex + 1) === 'SAMX') return 1  
    return 0
}   

function findVertically(fromIndex: number, lines: string[]): number {
    if (!lines.length) return 0
    const result = 'X' + lines[0][fromIndex] + lines[1][fromIndex] + lines[2][fromIndex]
    return result === 'XMAS' ? 1 : 0
}

function findDiagonally(fromIndex: number, lines: string[]): number {
    if (!lines.length) return 0

    let foundXmas = 0
    if (fromIndex <= lines[0].length - 5) {
        const result = 'X' + lines[0][fromIndex + 1] + lines[1][fromIndex + 2] + lines[2][fromIndex + 3] 
        if (result === 'XMAS') ++foundXmas
    }
    if (fromIndex >= 3) {
        const result = 'X' + lines[0][fromIndex - 1] + lines[1][fromIndex - 2] + lines[2][fromIndex - 3] 
        if (result === 'XMAS') ++foundXmas
    }
    return foundXmas 
}

assert.equal(solve(puzzle), 18)