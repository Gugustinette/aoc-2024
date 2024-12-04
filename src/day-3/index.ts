import { loadData } from "../util/loadData.ts";

function part1(): number {
  // Load corrupted memory
  const corruptedMemory = loadData("src/day-3/data.txt")
  // Extract uncorrupted muls using Regex
  const mulExtractor = new RegExp("mul\\(\\d{0,3},\\d{0,3}\\)", "g")
  const muls = corruptedMemory.matchAll(mulExtractor)
  // For each mul
  let total = 0
  muls.forEach((mulObject) => {
    const mulString = mulObject[0]
    // Extract numbers using Regex
    const numbers = mulString.matchAll(new RegExp("\\d{1,3}", "g"))
    const firstNumber = Number(numbers.next().value)
    const secondNumber = Number(numbers.next().value)
    // Add the multiplication of both number to the total
    total += firstNumber * secondNumber
  })
  // Return the total
  return total
}

enum InstructionType {
  MUL,
  DO,
  DONT
}
interface Instruction {
  index: number
  type: InstructionType
}
interface Mul extends Instruction {
  firstNumber: number
  secondNumber: number
}
function part2(): number {
  // Load corrupted memory
  const corruptedMemory = loadData("src/day-3/data.txt")
  const instructions: Instruction[] = []
  // Extract mul instructions using Regex
  const mulExtractor = new RegExp("mul\\(\\d{0,3},\\d{0,3}\\)", "g")
  const muls = corruptedMemory.matchAll(mulExtractor)
  muls.forEach((mulObject) => {
    const mulString = mulObject[0]
    // Extract numbers using Regex
    const numbers = mulString.matchAll(new RegExp("\\d{1,3}", "g"))
    const firstNumber = Number(numbers.next().value)
    const secondNumber = Number(numbers.next().value)
    // Add the mul instruction to the instructions array
    instructions.push({
      index: mulObject.index,
      type: InstructionType.MUL,
      firstNumber,
      secondNumber
    } as Mul)
  })
  // Extract do instructions using Regex
  const doExtractor = new RegExp("do\\(\\)", "g")
  const dos = corruptedMemory.matchAll(doExtractor)
  dos.forEach((mulObject) => {
    // Add the do instruction to the instructions array
    instructions.push({
      index: mulObject.index,
      type: InstructionType.DO
    })
  })
  // Extract don't instructions using Regex
  const dontExtractor = new RegExp("don't\\(\\)", "g")
  const donts = corruptedMemory.matchAll(dontExtractor)
  donts.forEach((mulObject) => {
    // Add the don't instruction to the instructions array
    instructions.push({
      index: mulObject.index,
      type: InstructionType.DONT
    })
  })
  // Sort instructions by index
  instructions.sort((a, b) => {
    if (a.index < b.index) {
      return -1
    }
    if (b.index < a.index) {
      return 1
    }
    return 0;
  })
  // Read instructions to compute total
  let total = 0
  let doMul = true
  instructions.forEach((instruction) => {
    if (instruction.type === InstructionType.MUL && doMul) {
      const mul = instruction as Mul
      total += mul.firstNumber * mul.secondNumber
    }
    else if (instruction.type === InstructionType.DO) {
      doMul = true
    } else if (instruction.type === InstructionType.DONT) {
      doMul = false
    }
  })
  // Return the total
  return total
}

export function resolve(): void {
  console.log("Part 1 result : " + part1())
  console.log("Part 2 result : " + part2())
}
