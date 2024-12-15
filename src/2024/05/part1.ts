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
  updates.forEach((update) => {
    const rulesByKey: Rule[] = []
    update.pages.map((updatePage) => {
      const ruleByKey = findRuleByKey(rules, updatePage)
      if (ruleByKey) rulesByKey.push(ruleByKey)
    })

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

  // apply rules
  updates.forEach((update) => {
    let isUpdateCorrect = true
    for (let i = 0; i < update.pages.length; i++) {
        if (i === 0) continue
        const ruleToApply = update.rulesToApply.find((rule) => rule.pageNumber === update.pages[i])
        if (!ruleToApply) continue
        
        for (let j = 0; j < i; j++) {
          ruleToApply.mustBeBefore.forEach((before) => {
            if (update.pages[j] === before) isUpdateCorrect = false
          })
        }
    }

    if (isUpdateCorrect) correctUpdates.push(update)
  })

  return correctUpdates.reduce((acc, val) => acc + val.middleNumber, 0)
}

assert.equal(solve(puzzle), 143)
