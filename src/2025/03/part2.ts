import fs from 'fs'
import path from 'path'

const startTime = performance.now()

const banks = fs
    .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
    .split('\n')

function getLargestNumber(bankSubstring: string): [number, number] {
    let maxNumber = Number(bankSubstring[0])
    let maxNumberIndex = 0

    for (let i = 0; i < bankSubstring.length; i++) {
        const value = Number(bankSubstring[i])
        // exit early
        if (value === 9) {
            maxNumber = value
            maxNumberIndex = i
            break
        }
        else if (value > maxNumber) {
            maxNumber = value
            maxNumberIndex = i
        }
    }
    return [maxNumber, maxNumberIndex]
}

function calculateMaximumJoltage(bank: string): number {
    const joltageLength = 12
    const restLength = bank.length - joltageLength
    const latestStartIndex = restLength
    const amountToRemove = restLength

    const findFirstNumberSubstring = bank.substring(0, latestStartIndex + 1) // need to include latest start
    const [firstNumber, index] = getLargestNumber(findFirstNumberSubstring)
    // first number is on latest possible position, return last 12 numbers
    // edge case isn't even present in puzzle data...
    if (index === latestStartIndex) {
        console.log(bank)
        return Number(bank.substring(latestStartIndex))
    }

    // const substring = bank.substring(index + 1)

    // const [secondNumber, _] = getLargestNumber(substring)

    // return Number(`${firstNumber}${secondNumber}`)
    return 0
}

let result = 0

banks.forEach((bank: string) => {
    result += calculateMaximumJoltage(bank)
})

const endTime = performance.now()
console.log(`runtime: ${endTime - startTime} ms`)
console.log(result)
