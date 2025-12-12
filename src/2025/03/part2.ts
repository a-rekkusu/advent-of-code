import fs from 'fs'
import path from 'path'

const startTime = performance.now()

const banks = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8').split('\n')

function getLargestNumber(bank: string, startIndex: number, distanceToEnd: number): [number, number] {
  let maxNumber = Number(bank[startIndex])
  let maxNumberIndex = startIndex

  for (let i = startIndex; i <= bank.length - distanceToEnd; i++) {
    const value = Number(bank[i])
    // exit early
    if (value === 9) {
      maxNumber = value
      maxNumberIndex = i
      break
    } else if (value > maxNumber) {
      maxNumber = value
      maxNumberIndex = i
    }
  }
  return [maxNumber, maxNumberIndex]
}

function calculateMaximumJoltage(bank: string): number {
  const resultJoltage: number[] = []
  let startIndex = 0

  for (let i = 12; i > 0; i--) {
    const [maxNumber, index] = getLargestNumber(bank, startIndex, i)
    resultJoltage.push(maxNumber)
    startIndex = index + 1
  }

  return Number(`${resultJoltage.join('')}`)
}

let result = 0

banks.forEach((bank: string) => {
  result += calculateMaximumJoltage(bank)
})

const endTime = performance.now()
console.log(`runtime: ${endTime - startTime} ms`)
console.log(result)
