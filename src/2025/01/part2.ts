import fs from 'fs'
import path from 'path'

const puzzle = fs
    .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
    .split('\n')

let dial = 50
let zeroCount = 0

puzzle.forEach((instruction) => {
    const distance = Number(instruction.substring(1))
    const hundredsCount = Math.floor(distance / 100)
    zeroCount += hundredsCount

    if (instruction.charAt(0) === 'R') {
        dial += distance % 100

        if (dial >= 100) {
            dial -= 100
            zeroCount++
        }
    } else {
        let fromDialPositionZero = dial === 0

        dial -= distance % 100

        if (dial === 0) {
            zeroCount++
        }
        else if (Math.sign(dial) === -1) {
            dial += 100

            if (!fromDialPositionZero) zeroCount++
        }
    }
})

console.log(zeroCount)