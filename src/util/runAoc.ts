/**
 * Custom method to run and monitor the solving function
 * @param resolve The function that resolves a Aoc puzzle
 */
export function runAoc(resolve: () => void) {
  const startTime = performance.now()
  resolve()
  console.log("Time : " + Math.ceil(Math.abs(startTime - performance.now())) + "ms")
}
