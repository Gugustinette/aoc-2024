import { existsSync } from "@std/fs";

export function resolve(): void {
  // Check if the input file exists
  if (!existsSync("src/day-1/data.txt")) {
    throw new Error("File not found");
  }
  // Read the input file
  const data = Deno.readTextFileSync("src/day-1/data.txt");
  console.log(data);
}

resolve();
