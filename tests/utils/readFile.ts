import fs from 'fs'
import path from 'path'

export function readData(
  year: number,
  day: number
): { sampleData: string[]; puzzleData: string[] } {
  const relativePath = `./tests/${year}/${day < 10 ? `0${day}` : day}/`
  const sampleData = fs
    .readFileSync(path.resolve(relativePath, 'sampleData.txt'), 'utf8')
    .split('\n')

  const puzzleData = fs
    .readFileSync(path.resolve(relativePath, 'puzzleData.txt'), 'utf8')
    .split('\n')

  return { sampleData, puzzleData }
}
