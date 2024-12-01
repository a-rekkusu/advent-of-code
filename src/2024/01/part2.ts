export function executePart2(input: string[]): number {
  const list1: number[] = []
  const list2: number[] = []

  input.forEach((line) => {
    const splitLine = line.split('  ')
    list1.push(+splitLine[0])
    list2.push(+splitLine[1])
  })

  const counts: Record<number, number> = {}

  list1.forEach((leftNum) => (counts[leftNum] = 0))
  list2.forEach((rightNum) => {
    if (counts[rightNum] !== undefined) ++counts[rightNum]
  })

  const similarities: number[] = []
  const hasRepeatingNumbers = new Set(list1).size !== list1.length

  for (const [key, value] of Object.entries(counts)) {
    if (hasRepeatingNumbers) {
      similarities.push(+key * value * value)
      // the puzzle data has no repeating numbers in the left list
    } else similarities.push(+key * value)
  }

  return similarities.reduce((acc, val) => acc + val, 0)
}
