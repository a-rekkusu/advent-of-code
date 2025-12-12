import fs from 'fs'
import path from 'path'

const startTime = performance.now()

const input = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8').split('\n')

let result = 0

input.forEach((_line: string) => {})

const endTime = performance.now()
console.log(`runtime: ${endTime - startTime} ms`)
console.log(result)
