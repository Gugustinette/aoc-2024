import { loadData } from "../util/loadData.ts";

function part1(): number {
  // Load data
  const data = loadData("src/day-4/data.txt")
  // Split by lines
  const lines = data.split("\n")
  const lineLength = lines[0].length
  let total = 0
  for (let row = 0; row < lineLength; row++) {
    for (let column = 0; column < lineLength; column++) {
      // Horizontal
      if (column <= lineLength - 4) {
        const horizontal = lines[row].charAt(column) + lines[row].charAt(column + 1) + lines[row].charAt(column + 2) + lines[row].charAt(column + 3)
        if (horizontal === "XMAS" || horizontal === "SAMX") {
          total += 1
        }
      }
      // Vertical & Diagonal
      if (row <= lineLength - 4) {
        // Vertical
        const vertical = lines[row].charAt(column) + lines[row + 1].charAt(column) + lines[row + 2].charAt(column) + lines[row + 3].charAt(column)
        if (vertical === "XMAS" || vertical === "SAMX") {
          total += 1
        }
        // Diagonal
        // Top-Left to Bottom-Right
        if (column <= lineLength - 4) {
          const topLeftBottomRight = lines[row].charAt(column) + lines[row + 1].charAt(column + 1) + lines[row + 2].charAt(column + 2) + lines[row + 3].charAt(column + 3)
          if (topLeftBottomRight === "XMAS" || topLeftBottomRight === "SAMX") {
            total += 1
          }
        }
        // Top-Right to Bottom-Left
        if (column >= 3) {
          const topRightBottomLeft = lines[row].charAt(column) + lines[row + 1].charAt(column - 1) + lines[row + 2].charAt(column - 2) + lines[row + 3].charAt(column - 3)
          if (topRightBottomLeft === "XMAS" || topRightBottomLeft === "SAMX") {
            total += 1
          }
        }
      }
    }
  }
  return total
}

function part2(): number {
  // Load data
  const data = loadData("src/day-4/data.txt")
  // Split by lines
  const lines = data.split("\n")
  const lineLength = lines[0].length
  let total = 0
  // Traverse string with an offset of 1 for each side
  for (let row = 1; row < lineLength - 1; row++) {
    for (let column = 1; column < lineLength - 1; column++) {
      // Find a A character
      if (lines[row].charAt(column) === "A") {
        // Verify if it corresponds to an X-MAS
        const topLeftBottomRight = lines[row - 1].charAt(column - 1) + lines[row].charAt(column) + lines[row + 1].charAt(column + 1)
        const topRightBottomLeft = lines[row - 1].charAt(column + 1) + lines[row].charAt(column) + lines[row + 1].charAt(column - 1)
        if ((topLeftBottomRight === "MAS" || topLeftBottomRight === "SAM") && (topRightBottomLeft === "MAS" || topRightBottomLeft === "SAM")) {
          total += 1
        }
      }
    }
  }
  return total
}

export function resolve(): void {
  console.log("Part 1 result : " + part1())
  console.log("Part 2 result : " + part2())
}
