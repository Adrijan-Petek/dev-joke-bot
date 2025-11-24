import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import gradient from "gradient-string";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedJokes: string[] | null = null;

// Typing animation helper with cursor
export async function typeText(text: string, delay = 30, cursor = "|") {
  for (const char of text) {
    process.stdout.write(char);
    await new Promise((r) => setTimeout(r, delay));
  }
  // Show blinking cursor after typing
  for (let i = 0; i < 5; i++) {
    process.stdout.write(cursor);
    await new Promise((r) => setTimeout(r, 500));
    process.stdout.write("\b \b");
    await new Promise((r) => setTimeout(r, 500));
  }
  console.log("\n");
}

// Load and cache jokes JSON asynchronously
async function loadJokes(): Promise<string[]> {
  if (cachedJokes) return cachedJokes;

  const jokes
