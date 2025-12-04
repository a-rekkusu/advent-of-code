const results: number[] = []

function extractNumbers(input: string): void {
  const regex = /(one|two|three|four|five|six|seven|eight|nine|\d)/g
  const reverseRegex = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d)/g
  const firstMatch = regex.exec(input)
  const reverseInput = input.split('').reverse().join('')
  const lastMatch = reverseRegex.exec(reverseInput)

  if (!firstMatch || !lastMatch) {
    console.log(`Couldn't find numbers in input ${input}`)
    return
  }

  const matchedNumbers =
    convertToNumber(firstMatch[0]) + convertToNumber(lastMatch[0])
  const result = parseInt(matchedNumbers)

  if (result < 11 || result > 99) {
    console.log(`Invalid result ${result} from input ${input}`)
    return
  }

  results.push(result)
}

function convertToNumber(number: string): string {
  switch (number) {
    case 'one':
    case 'eno':
      return '1'
    case 'two':
    case 'owt':
      return '2'
    case 'three':
    case 'eerht':
      return '3'
    case 'four':
    case 'ruof':
      return '4'
    case 'five':
    case 'evif':
      return '5'
    case 'six':
    case 'xis':
      return '6'
    case 'seven':
    case 'neves':
      return '7'
    case 'eight':
    case 'thgie':
      return '8'
    case 'nine':
    case 'enin':
      return '9'
    default:
      return number
  }
}

export function calculateSum(input: string[]): number {
  results.length = 0
  input.forEach((x) => extractNumbers(x))

  const sum = results.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)

  return sum
}
