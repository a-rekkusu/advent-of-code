type PartNumber = {
  value: number
  isRelevant: boolean // isAdjacent to symbol other than .
  startIndex: number
  endIndex: number
}

type EngineSymbol = {
  index: number
  value: string
  adjacentNumbers: number[]
  isAtStartOfLine: boolean
  isAtEndOfLine: boolean
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
      return line.symbols.filter(
        (symbol) => symbol.adjacentNumbers.length === 2
      )
    })
    .reduce((accumulator, currentLine) => {
      return (
        accumulator +
        currentLine.adjacentNumbers.reduce(
          (multiplier, currentNumber) => multiplier * currentNumber
        )
      )
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
    const endIndex = match.index + match[0].length - 1
    symbols.push({
      index: match.index,
      value: match[0],
      adjacentNumbers: [],
      isAtStartOfLine: match.index === 0 ? true : false,
      isAtEndOfLine: endIndex === input.length - 1 ? true : false
    })
  }

  return symbols
}

function findNumbers(input: string): PartNumber[] {
  const numbers = []

  let match: RegExpExecArray | null = null
  const regex = /[0-9]+/g

  while ((match = regex.exec(input)) !== null) {
    numbers.push({
      value: +match[0],
      isRelevant: false,
      startIndex: match.index,
      endIndex: match.index + match[0].length - 1
    })
  }

  return numbers
}

function setRelevantNumbers(lines: Line[]): void {
  for (let i = 0; i < lines.length; i++) {
    // no symbols in line, can skip
    if (lines[i].symbols.length === 0) continue

    if (i === 0) {
      // first line, must not check against earlier line
      lines[i].symbols.forEach((symbol) => {
        checkForAdjacentNumbers(symbol, [lines[i], lines[i + 1]])
      })
    } else if (i === lines.length - 1) {
      /// last line, must not check against next line
      lines[i].symbols.forEach((symbol) => {
        checkForAdjacentNumbers(symbol, [lines[i], lines[i - 1]])
      })
    } else {
      // regular line, check before and after
      lines[i].symbols.forEach((symbol) => {
        checkForAdjacentNumbers(symbol, [lines[i], lines[i - 1], lines[i + 1]])
      })
    }
  }
}

function checkForAdjacentNumbers(symbol: EngineSymbol, lines: Line[]): void {
  if (symbol.value !== '*') return

  lines.forEach((line) => {
    line.partNumbers.forEach((partNumber) => {
      if (symbol.isAtStartOfLine) {
        if (partNumber.endIndex <= symbol.index + 1)
          symbol.adjacentNumbers.push(partNumber.value)
      } else if (symbol.isAtEndOfLine) {
        if (partNumber.startIndex >= symbol.index - 1)
          symbol.adjacentNumbers.push(partNumber.value)
      } else {
        if (
          (partNumber.startIndex <= symbol.index + 1 &&
            partNumber.startIndex >= symbol.index - 1) ||
          (partNumber.endIndex <= symbol.index + 1 &&
            partNumber.endIndex >= symbol.index - 1)
        )
          symbol.adjacentNumbers.push(partNumber.value)
      }
    })
  })
}
