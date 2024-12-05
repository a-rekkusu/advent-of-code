import fs from 'fs'
import path from 'path'


export function readData(
    relativePath: string
  ): string[] {
    return fs
      .readFileSync(path.resolve(relativePath, 'data.txt'), 'utf8')
      .split('\n')
  }