import { loadData } from "../util/loadData.ts";

interface Update extends Array<number> {}
interface RuleMap {
  [key: number]: number[]
}
class Rules {
  public rulemap: RuleMap

  constructor() {
    this.rulemap = {}
  }

  /**
   * Add a rule to the rule map
   * @param firstNumber The number before the secondNumber
   * @param secondNumber The number after the firstNumber
   */
  addRule(firstNumber: number, secondNumber: number) {
    // Check if keys exist
    if (this.rulemap[firstNumber] === undefined) {
      this.rulemap[firstNumber] = []
    }
    // Add rules
    this.rulemap[firstNumber].push(secondNumber)
  }

  /**
   * Tells if the first number is correctly placed if it is before the second number
   * @param firstNumber The first number
   * @param secondNumber The second number
   * @returns False if the numbers are breaking one of the rule, true otherwise
   */
  isPlacedCorrectly(firstNumber: number, secondNumber: number) {
    let result = true
    // If there are rules stating the second number should be before another one
    if (this.rulemap[secondNumber] !== undefined) {
      this.rulemap[secondNumber].forEach((ruleNumber) => {
        // There's a rule stating the second number should be after the first one, return false
        if (ruleNumber === firstNumber) {
          result = false
        }
      })
    }
    // No rules were broken, return true
    return result
  }

  /**
   * Tells if a given update is correctly ordered
   * @param update The update to check
   * @returns True if the update doesn't break any rule, false otherwise
   */
  isUpdateCorrectlyOrdered(update: Update) {
    let result = true
    for (let i = 0; i < update.length - 1; i++) {
      // Get the actual number from the after array
      const actualNumber = update[i]
      const numbersToCheck: number[] = structuredClone(update).splice(i + 1)
      numbersToCheck.forEach((numberToCheck) => {
        if (!this.isPlacedCorrectly(actualNumber, numberToCheck)) {
          result = false
        }
      })
    }
    // Return the result
    return result
  }
}

function part1(): number {
  // Load data
  const data = loadData("src/day-5/data.txt")
  const dataRules = data.split("\n\n")[0]
  const dataUpdates = data.split("\n\n")[1]
  // Load updates
  const updates: Update[] = dataUpdates.split("\n").map((value) => value.split(",").map((updateValue) => Number(updateValue)))
  // Load rules
  const rules: Rules = new Rules()
  dataRules.split("\n").forEach((rule) => {
    rules.addRule(Number(rule.split("|")[0]), Number(rule.split("|")[1]))
  })
  // For each correctly ordered update, add the middle number to the result
  let total = 0
  updates.forEach((update: Update) => {
    if (rules.isUpdateCorrectlyOrdered(update)) {
      total += update[Math.ceil(update.length / 2)]
    }
  })
  return total
}

export function resolve(): void {
  console.log("Part 1 result : " + part1())
  // console.log("Part 2 result : " + part2())
}
