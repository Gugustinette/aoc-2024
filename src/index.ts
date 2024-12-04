import { runAoc } from "./util/runAoc.ts";

if (import.meta.main) {
  // Input of the aoc day
  const aocDay = Deno.args[0];

  // Import the main function of the aoc day
  const { resolve } = await import(`./day-${aocDay}/index.ts`);

  // Run the solution with the input of the aoc day
  runAoc(resolve);
}
