type Card = {
  cardNumber: number
  instances: number
  winningNumbers: number[]
  myNumbers: number[]
  matchingNumbers: number[]
  nextCardsCopied: number
}

export function execute(input: string[]): number {
  const preparedData = input.map((x) => prepareData(x))

  preparedData.forEach((card) => {
    fillMatchingNumbers(card)
  })
  calculateCardInstances(preparedData)

  const sum = preparedData.reduce((accumulator, card) => {
    return accumulator + card.instances
  }, 0)

  return sum
}

function prepareData(input: string): Card {
  const cardNumber = input
    .split(':')[0]
    .split(' ')
    .filter((x) => x)[1]
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
    cardNumber: +cardNumber,
    instances: 1,
    winningNumbers: winningNumbers.map((x) => +x),
    myNumbers: myNumbers.map((x) => +x),
    matchingNumbers: [],
    nextCardsCopied: 0
  }
}

function fillMatchingNumbers(card: Card): void {
  card.winningNumbers.forEach((winningNumber) => {
    card.myNumbers.forEach((myNumber) => {
      if (winningNumber === myNumber) card.matchingNumbers.push(winningNumber)
    })
  })
}

function calculateCardInstances(cards: Card[]): void {
  for (const [index, card] of cards.entries()) {
    if (card.matchingNumbers.length <= 0) continue

    card.nextCardsCopied = card.matchingNumbers.length
    for (let instance = 0; instance < card.instances; instance++) {
      for (let i = index + 1; i < index + card.nextCardsCopied + 1; i++) {
        if (i >= cards.length) break

        cards[i].instances++
      }
    }
  }
}
