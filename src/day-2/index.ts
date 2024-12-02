import { existsSync } from "@std/fs";
import { runAoc } from "../util/runAoc.ts";

interface Report {
  levels: number[]
}
function loadReports() : Report[] {
  // Check if the input file exists
  if (!existsSync("src/day-2/data.txt")) {
    throw new Error("File not found");
  }
  // Read the input file
  const data = Deno.readTextFileSync("src/day-2/data.txt");
  const reports: Report[] = []
  // Fill lists
  data.split("\n").forEach((inputLine) => {
    const levels = inputLine.split(" ")
    reports.push({
      levels: levels.map((level) => {
        return Number(level)
      })
    })
  })
  return reports
}

function isSafe(report: Report) {
  const negative = report.levels[0] > report.levels[1]
  for (let i = 0; i < report.levels.length - 1; i++) {
    // Difference between 2 adjacent levels must be between 1 and 3
    const diff = Math.abs(report.levels[i] - report.levels[i + 1])
    if (diff < 1 || diff > 3)
      return false
    // If we're aiming for a decrease report, next level should be less than the actual one
    if (negative && report.levels[i] < report.levels[i + 1]) {
      return false
    }
    // If we're aiming for an increase report, next level should be more than the actual one
    if (!negative && report.levels[i] > report.levels[i + 1]) {
      return false
    }
  }
  return true
}

function part1(): number {
  // Load reports
  const reports = loadReports()
  // Check if reports are safe
  let count = 0
  reports.forEach((report) => {
    if (isSafe(report)) {
      count++
    }
  })
  // Return
  return count
}

function part2(): number {
  // Load reports
  const reports = loadReports()
  // Check if reports are safe
  let count = 0
  reports.forEach((report) => {
    if (isSafe(report)) {
      count++
    } else {
      // Use Problem Dampener if applicable
      for (let i = 0; i < report.levels.length; i++) {
        // Clone the array
        const newLevels = structuredClone(report.levels)
        // Remove the current level
        newLevels.splice(i, 1)
        // Check if the report would have been safe in this case
        const newReport: Report = {
          levels: newLevels
        }
        if (isSafe(newReport)) {
          count++
          break;
        }
      }
    }
  })
  // Return
  return count
}

export function resolve(): void {
  console.log("Part 1 result : " + part1())
  console.log("Part 2 result : " + part2())
}

runAoc(resolve)
