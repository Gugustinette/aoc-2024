import { existsSync } from "@std/fs"

/**
 * Method to load a given file as a string
 * @param path The path to the input file
 * @returns The input file content as a string
 */
export function loadData(path: string) : string {
  // Check if the input file exists
  if (!existsSync(path)) {
    throw new Error("File not found")
  }
  // Read the input data
  return Deno.readTextFileSync(path)
}
