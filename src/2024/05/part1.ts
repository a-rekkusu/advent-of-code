import assert from 'node:assert'
import fs from 'fs'
import path from 'path'

const puzzle = fs
  .readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
  .split('\n')

interface Rule {
  pageNumber: number
  mustBeBefore: number[]
}

interface Update {
  pages: number[]
  middleNumber: number
  rulesToApply: Rule[]
}

function findRuleByKey(rules: Rule[], pageNumber: number): Rule | null {
  const rule = rules.find((rule) => rule.pageNumber === pageNumber)
  return rule ?? null
}

function findRulesByValue(rules: Rule[], pageNumber: number): Rule[] {
  const result = rules.filter((rule) => rule.mustBeBefore.includes(pageNumber))
  return result
}

function prepareData(input: string[]): Update[]  {
  const rules: Rule[] = []
  const updates: Update[] = []
  input.forEach((line) => {
    // populate rules
    if (line.length > 2 && line[2] === '|') {
      const pageNumber = Number(line.substring(0, 2))
      const mustBeBeforePageNumber = Number(line.substring(3))
      const rulesIndex = rules.findIndex(
        (rule) => rule.pageNumber === pageNumber
      )

      if (rulesIndex !== -1) {
        rules[rulesIndex].mustBeBefore.push(mustBeBeforePageNumber)
      } else {
        rules.push({
          pageNumber,
          mustBeBefore: [mustBeBeforePageNumber]
        })
      }
    } // populate updates
    else if (line.length > 1) {
      const updateNumbers = line
        .split(',')
        .map((updateNumber) => Number(updateNumber))
      updates.push({
        pages: updateNumbers,
        middleNumber: updateNumbers[updateNumbers.length / 2 - 0.5],
        rulesToApply: []
      })
    }
  })

  // populate which rules to apply to updates
  updates.forEach((update, i) => {
    const rulesByKey: Rule[] = []
    // const rulesByValue: Rule[] = []
    update.pages.map((updatePage, _j) => {
      const ruleByKey = findRuleByKey(rules, updatePage)
      if (ruleByKey) rulesByKey.push(ruleByKey)
      // rulesByValue.push(...findRulesByValue(rules, updatePage))

      // if (j === update.pages.length - 1) {
      //     rulesByValue = Array.from(new Set(rulesByValue).values())
      // }
    })

    // console.log('update', i)
    // console.dir(rulesByKey, { depth: null })
    // console.dir(rulesByValue, { depth: null })

    rulesByKey.forEach((rule) => {
      if (rule.mustBeBefore.filter((x) => update.pages.includes(x)).length)
        update.rulesToApply.push(rule)
    })
  })

  return updates 
}

function solve(input: string[]): number {
  const updates = prepareData(input)

  const correctUpdates: Update[] = []

  updates.forEach((update) => {
    update.pages.forEach((updatePage, i) => {
        // apply rules
    })
  })

  return correctUpdates.reduce((acc, val) => acc + val.middleNumber, 0)
}

assert.equal(solve(puzzle), 0)
