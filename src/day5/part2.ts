type RangeMap = {
  destinationRangeStart: number
  sourceRangeStart: number
  rangeLength: number
}

type FromToMap = {
  maps: RangeMap[]
}

type Range = {
  from: number
  to: number
}

export function execute(input: string[]): number {
  const { seeds, preparedData } = prepareData(input)

  const sourceSeedRanges: Range[] = []

  let totalCount = 0
  for (let i = 0; i < seeds.length; i++) {
    const isEven = i % 2 === 0
    if (isEven) {
      totalCount += seeds[i + 1]
      sourceSeedRanges.push({ from: seeds[i], to: seeds[i] + seeds[i + 1] })
    }
  }

  console.log('total seed count:', totalCount)
  console.log('source seed ranges: ', sourceSeedRanges)

  let result: number | null = null

  console.log('start time', new Date().toISOString())
  let counter = 0

  sourceSeedRanges.forEach((sourceSeedRange, rangeIndex) => {
    console.log(
      `executing logic for source seed range ${rangeIndex}:`,
      sourceSeedRange,
      `current result: ${result}`
    )

    for (let i = sourceSeedRange.from; i <= sourceSeedRange.to; i++) {
      const seedResult: number[] = [i]

      preparedData.forEach((fromToMap, outerMapIndex) => {
        let mappingResult: number | null = null

        fromToMap.maps.forEach((numberMaps, innerMapIndex) => {
          if (mappingResult) return

          if (
            seedResult[outerMapIndex] >= numberMaps.sourceRangeStart &&
            numberMaps.sourceRangeStart + numberMaps.rangeLength >=
              seedResult[outerMapIndex]
          ) {
            mappingResult =
              numberMaps.destinationRangeStart +
              (seedResult[outerMapIndex] - numberMaps.sourceRangeStart)
          } else if (innerMapIndex === fromToMap.maps.length - 1) {
            mappingResult = seedResult[outerMapIndex]
          }
        })

        seedResult.push(mappingResult!)
      })
      counter++
      if (counter !== 0 && counter % 100_000_000 === 0) {
        console.log('100 mio seeds processed', new Date())
      }
      if (!result || seedResult.at(-1)! < result) result = seedResult.at(-1)!
    }
  })

  return result!
}

function prepareData(input: string[]): {
  seeds: number[]
  preparedData: FromToMap[]
} {
  const preparedData: FromToMap[] = []
  let seeds: number[] = []
  let newMap = false
  input.forEach((line) => {
    if (line.length === 0) {
      newMap = true
      return
    }
    if (line.includes('seeds:')) {
      seeds = line
        .split(': ')[1]
        .split(' ')
        .map((x) => +x)
      newMap = false
      return
    }
    if (line.includes('map:')) {
      preparedData.push({
        maps: []
      })
      newMap = false
      return
    } else {
      preparedData.at(-1)?.maps.push({
        destinationRangeStart: +line.split(' ')[0],
        sourceRangeStart: +line.split(' ')[1],
        rangeLength: +line.split(' ')[2]
      })
      return
    }
  })

  return {
    seeds,
    preparedData
  }
}
