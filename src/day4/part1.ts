type Card = {
  winningNumbers: number[]
  myNumbers: number[]
  matchingNumbers: number[]
  score: number
}

export function execute(input: string[]): number {
  const preparedData = input.map((x) => prepareData(x))

  preparedData.forEach((card) => {
    fillMatchingNumbers(card)
    calculateCardValue(card)
  })

  const sum = preparedData.reduce((accumulator, card) => {
    return accumulator + card.score
  }, 0)

  return sum
}

function prepareData(input: string): Card {
  const winningNumbers = input
    .split(':')[1]
    .split('|')[0]
    .split(' ')
    .filter((x) => x)
  const myNumbers = input
    .split(':')[1]
    .split('|')[1]
    .split(' ')
    .filter((x) => x)

  return {
    winningNumbers: winningNumbers.map((x) => +x),
    myNumbers: myNumbers.map((x) => +x),
    matchingNumbers: [],
    score: 0
  }
}

function fillMatchingNumbers(card: Card): void {
  card.winningNumbers.forEach((winningNumber) => {
    card.myNumbers.forEach((myNumber) => {
      if (winningNumber === myNumber) card.matchingNumbers.push(winningNumber)
    })
  })
}

function calculateCardValue(card: Card): void {
  for (let i = 0; i < card.matchingNumbers.length; i++) {
    if (i === 0) {
      card.score = 1
      continue
    }

    card.score *= 2
  }
}
