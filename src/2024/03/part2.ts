import assert from 'node:assert'
import fs from 'fs'
import path from 'path'

const puzzle = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')

function multiply(input: string): number {
    const [left, right] = input.split(',')
    return +left.substring(4) * +right.substring(0, right.length - 1) 
}

function solve(input: string): number {
    const dos = input.split('do()')
    const toMatch: string[] = []

    for (const doMult of dos) {
        const doBeforeDont = ''
        let filteredDo = doMult
        if (doMult.includes('don\'t()')) {
            console.log(doMult.split('don\'t()'))
            doMult.split('don\'t()').forEach((dont, i) => { 
                if (i === 0) { toMatch.push(doBeforeDont) } else {
                    filteredDo = filteredDo.replace(dont, '') 
                }
            })
        }
        
        toMatch.push(filteredDo)
    }

    const matches = [...toMatch.join('').matchAll(/mul\(\d{1,3},\d{1,3}\)/g)]
    return matches.reduce((acc, matches) => acc + multiply(matches[0]), 0)
}

assert.equal(solve(puzzle), 48)