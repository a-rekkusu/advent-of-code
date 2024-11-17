type PartNumber = {
  value: number
  isRelevant: boolean // isAdjacent to symbol other than .
  startIndex: number
  endIndex: number
  isAtStartOfLine: boolean
  isAtEndOfLine: boolean
}

type EngineSymbol = {
  index: number
  value: string
}

type Line = {
  partNumbers: PartNumber[]
  symbols: EngineSymbol[]
}

export function execute(input: string[]): number {
  const preparedData = input.map((line) => prepareData(line))

  setRelevantNumbers(preparedData)

  const sum = preparedData
    .flatMap((line) => {
      return line.partNumbers.filter((partNumber) => partNumber.isRelevant)
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.value
    }, 0)

  return sum
}

function prepareData(input: string): Line {
  const engineSymbols = findSymbols(input)
  const partNumbers = findNumbers(input)

  return { partNumbers, symbols: engineSymbols }
}

function findSymbols(input: string): EngineSymbol[] {
  const symbols = []
  let match: RegExpExecArray | null = null

  const regex = /[^.\d]/g

  while ((match = regex.exec(input)) != null) {
    symbols.push({ index: match.index, value: match[0] })
  }

  return symbols
}

function findNumbers(input: string): PartNumber[] {
  const numbers = []

  let match: RegExpExecArray | null = null
  const regex = /[0-9]+/g

  while ((match = regex.exec(input)) !== null) {
    const endIndex = match.index + match[0].length - 1

    numbers.push({
      value: +match[0],
      isRelevant: false,
      startIndex: match.index,
      endIndex,
      isAtStartOfLine: match.index === 0 ? true : false,
      isAtEndOfLine: endIndex === input.length - 1 ? true : false
    })
  }

  return numbers
}

function setRelevantNumbers(lines: Line[]): void {
  for (let i = 0; i < lines.length; i++) {
    // no numbers in line, can skip
    if (lines[i].partNumbers.length === 0) continue

    if (i === 0) {
      // first line, must not check against earlier line
      lines[i].partNumbers.forEach((partNumber) => {
        checkForAdjacentSymbols(partNumber, [lines[i], lines[i + 1]])
      })
    } else if (i === lines.length - 1) {
      /// last line, must not check against next line
      lines[i].partNumbers.forEach((partNumber) => {
        checkForAdjacentSymbols(partNumber, [lines[i], lines[i - 1]])
      })
    } else {
      // regular line, check before and after
      lines[i].partNumbers.forEach((partNumber) => {
        checkForAdjacentSymbols(partNumber, [
          lines[i],
          lines[i - 1],
          lines[i + 1]
        ])
      })
    }
  }
}

function checkForAdjacentSymbols(partNumber: PartNumber, lines: Line[]): void {
  lines.forEach((line) => {
    line.symbols.forEach((engineSymbol) => {
      if (partNumber.isAtStartOfLine) {
        if (engineSymbol.index <= partNumber.endIndex + 1)
          partNumber.isRelevant = true
      } else if (partNumber.isAtEndOfLine) {
        if (engineSymbol.index >= partNumber.startIndex - 1)
          partNumber.isRelevant = true
      } else {
        if (
          (engineSymbol.index <= partNumber.startIndex + 1 &&
            engineSymbol.index >= partNumber.startIndex - 1) ||
          (engineSymbol.index <= partNumber.endIndex + 1 &&
            engineSymbol.index >= partNumber.endIndex - 1)
        )
          partNumber.isRelevant = true
      }
    })
  })
}
