import { existsSync } from "@std/fs"
import { runAoc } from "../util/runAoc.ts"

function loadData() : string {
  // Check if the input file exists
  if (!existsSync("src/day-4/data.txt")) {
    throw new Error("File not found")
  }
  // Read the input data
  return Deno.readTextFileSync("src/day-4/data.txt")
}

function part1(): number {
  // Load data
  const data = loadData()
  // Get length of a line in the input data
  const lineLenght = data.split("\n")[0].length
  // Create regex patterns based on the length
  const regexes: RegExp[] = [
    // Horizontal
    new RegExp("XMAS", "g"),
    new RegExp("SAMX", "g"),
    // Vertical
    new RegExp("X(?=(.|\n){" + lineLenght + "})M(?=(.|\n){" + lineLenght + "})A(?=(.|\n){" + lineLenght + "})S", "g"),
    new RegExp("S(?=(.|\n){" + lineLenght + "})A(?=(.|\n){" + lineLenght + "})M(?=(.|\n){" + lineLenght + "})X", "g"),
    // Diagonal
    new RegExp("X(?=(.|\n){" + (lineLenght + 1) + "})M(?=(.|\n){" + (lineLenght + 1) + "})A(?=(.|\n){" + (lineLenght + 1) + "})S", "g"),
    new RegExp("S(?=(.|\n){" + (lineLenght + 1) + "})A(?=(.|\n){" + (lineLenght + 1) + "})M(?=(.|\n){" + (lineLenght + 1) + "})X", "g"),
    new RegExp("X(?=(.|\n){" + (lineLenght - 1) + "})M(?=(.|\n){" + (lineLenght - 1) + "})A(?=(.|\n){" + (lineLenght - 1) + "})S", "g"),
    new RegExp("S(?=(.|\n){" + (lineLenght - 1) + "})A(?=(.|\n){" + (lineLenght - 1) + "})M(?=(.|\n){" + (lineLenght - 1) + "})X", "g")
  ]
  // Use patterns to detect occurences of XMAS
  let total = 0
  regexes.forEach((regex) => {
    const xmasOccurences = data.matchAll(regex)
    // console.log(String(regex) + " : " + xmasOccurences.toArray().length)
    total += xmasOccurences.toArray().length
  })
  return total
}

export function resolve(): void {
  console.log("Part 1 result : " + part1() + " (expected : 2297)")
  // console.log("Part 2 result : " + part2())
}

runAoc(resolve)
