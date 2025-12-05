import fs from 'fs'
import path, { normalize } from 'path'

const startTime = performance.now()

const banks = fs
  .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
  .split('\n')

type JoltageWithIndex = { value: number; index: number }

function normalizeFirstJoltageIndex(
  firstJoltage: JoltageWithIndex,
  bankSubstring: string
): void {
  firstJoltage.index = bankSubstring.indexOf(String(firstJoltage.value))
}

function getLargestNumber(
  bankSubstring: string,
  foundJoltageNumbers: JoltageWithIndex[]
): JoltageWithIndex {
  let substringCopy = [...bankSubstring]
  foundJoltageNumbers.forEach((joltage) =>
    substringCopy.splice(substringCopy.indexOf(String(joltage.value)), 1)
  )

  const resultJoltage = { value: Number(substringCopy[0]), index: -1 }

  for (let i = 0; i < bankSubstring.length; i++) {
    if (foundJoltageNumbers.map((j) => j.index).includes(i)) continue
    const value = Number(bankSubstring[i])
    // exit early
    if (value === 9) {
      resultJoltage.value = value
      resultJoltage.index = i
      break
    } else if (value > resultJoltage.value) {
      resultJoltage.value = value
      resultJoltage.index = i
    }
  }

  // all remaining numbers are the same -> fill up from reverse
  if (new Set(substringCopy).size === 1) {
    function getAllIndexes(bankSubstring: string, value: string): number[] {
      const foundIndexes: number[] = []
      let index = -1

      while ((index = bankSubstring.indexOf(value, index + 1)) != -1) {
        foundIndexes.push(index)
      }
      return foundIndexes
    }

    const indexes = getAllIndexes(bankSubstring, String(resultJoltage.value))

    for (let i = 0; i < indexes.length; i++) {
      if (foundJoltageNumbers.map((j) => j.index).includes(indexes[i])) {
        continue
      }
      resultJoltage.index = indexes[i]
    }
  }
  // first number from substringCopy is highest -> find index in bankSubstring
  else if (resultJoltage.index === -1) {
    const maxNumberIndex = bankSubstring.indexOf(String(resultJoltage.value))
    resultJoltage.index = maxNumberIndex
  }

  return resultJoltage
}

function calculateMaximumJoltage(bank: string): number {
  const joltageLength = 12
  const latestStartIndex = bank.length - joltageLength

  const joltageNumbers: JoltageWithIndex[] = []

  const substringContainingFirstNumber = bank.substring(0, latestStartIndex + 1) // need to include latest start
  const firstJoltage = getLargestNumber(
    substringContainingFirstNumber,
    joltageNumbers
  )

  const substringContainingRestJoltage = bank.substring(firstJoltage.index)

  normalizeFirstJoltageIndex(firstJoltage, substringContainingRestJoltage)

  joltageNumbers.push(firstJoltage)

  for (let i = 0; i < joltageLength - 1; i++) {
    const foundJoltage = getLargestNumber(
      substringContainingRestJoltage,
      joltageNumbers
    )
    joltageNumbers.push(foundJoltage)
  }

  const resultJoltage = Number(
    joltageNumbers
      .sort((a, b) => a.index - b.index)
      .map((joltage) => joltage.value)
      .join('')
  )

  console.log(resultJoltage, bank)
  return resultJoltage
}

let result = 0

banks.forEach((bank: string) => {
  result += calculateMaximumJoltage(bank)
})

const endTime = performance.now()
console.log(`runtime: ${endTime - startTime} ms`)
console.log(result)
