import { existsSync } from "@std/fs";
import { runAoc } from "../util/runAoc.ts";

interface ListInput {
  left: number[]
  right: number[]
}
function loadLists() : ListInput {
  // Check if the input file exists
  if (!existsSync("src/day-1/data.txt")) {
    throw new Error("File not found");
  }
  // Read the input file
  const data = Deno.readTextFileSync("src/day-1/data.txt");
  // Create left and right lists
  const left: number[] = []
  const right: number[] = []
  // Fill lists
  data.split("\n").forEach((inputLine) => {
    const inputTuple = inputLine.split("   ")
    left.push(Number(inputTuple[0]))
    right.push(Number(inputTuple[1]))
  })
  return {
    left,
    right
  }
}

function part1(): number {
  // Load lists
  const input = loadLists()
  const left = input.left
  const right = input.right
  // Sort lists (by default, sorting on numbers will be from smallest to highest)
  left.sort()
  right.sort()
  // Compute total distance
  let totalDistance = 0
  for (let i = 0; i < left.length; i++) {
    totalDistance += left[i] > right[i] ? left[i] - right[i] : right[i] - left[i]
  }
  // Return total distance
  return totalDistance
}

function part2(): number {
  // Load lists
  const input = loadLists()
  const left = input.left
  const right = input.right
  // Compute similarity
  let similarity = 0
  left.forEach((leftNumber) => {
    // Compute number of apperence of the current number in the right list
    let numberOfAppearence = 0
    right.forEach((rightNumber) => {
      if (leftNumber === rightNumber)
        numberOfAppearence += 1
    })
    // Increase similarity
    similarity += leftNumber * numberOfAppearence
  })
  // Return total distance
  return similarity
}

export function resolve(): void {
  console.log("Part 1 result : " + part1())
  console.log("Part 2 result : " + part2())
}

runAoc(resolve)
