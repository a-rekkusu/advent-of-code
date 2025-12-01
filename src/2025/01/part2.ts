import fs from 'fs'
import path from 'path'

const puzzle = fs
    .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
    .split('\n')

let dial = 50
let zeroCount = 0

puzzle.forEach((instruction) => {
    let distance = Number(instruction.substring(1))
    const hundredsCount = Math.floor(distance / 100)
    zeroCount += hundredsCount

    if (distance >= 10) distance = Number(instruction.substring(instruction.length - 2))

    if (instruction.charAt(0) === 'L') {
        let fromDialPositionZero = dial === 0
        dial -= distance
        if (Math.sign(dial) === -1) {
            dial += 100
            if (!fromDialPositionZero) zeroCount++
        } else if (dial === 0) { zeroCount++ }
    } else {
        dial += distance
        if (dial >= 100) {
            dial -= 100
            zeroCount++
        }
    }
})

console.log(zeroCount)