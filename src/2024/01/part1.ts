export function executePart1(input: string[]): number {
  const list1: number[] = []
  const list2: number[] = []

  input.forEach((line) => {
    const splitLine = line.split('  ')
    list1.push(+splitLine[0])
    list2.push(+splitLine[1])
  })

  list1.sort()
  list2.sort()

  const distances: number[] = []

  list1.forEach((locationId, i) => {
    if (locationId > list2[i]) {
      distances.push(locationId - list2[i])
    } else distances.push(list2[i] - locationId)
  })

  return distances.reduce((acc, val) => acc + val, 0)
}
