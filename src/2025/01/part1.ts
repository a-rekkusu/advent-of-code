import fs from 'fs'
import path from 'path'

const puzzle = fs
    .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
    .split('\n') as Instruction[]

type Instruction =
  `${"L" | "R"}${number}`;

let dial = 50
let zeroCount = 0

puzzle.forEach((instruction: Instruction) => {
    const distance = Number(instruction.substring(1))

    if (instruction.charAt(0) === 'R') {
        dial += distance % 100
        if (dial >= 100) dial -= 100
    } else {
        dial -= distance % 100
        if (Math.sign(dial) === -1) dial += 100
    }

    if (dial === 0) zeroCount++
})

console.log(zeroCount)