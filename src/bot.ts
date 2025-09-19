import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import gradient from "gradient-string";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Typing animation helper
export async function typeText(text: string, delay = 30) {
  for (const char of text) {
    process.stdout.write(char);
    await new Promise((r) => setTimeout(r, delay));
  }
  console.log("\n");
}

// Get random joke from jokes.json
export function getRandomJoke(): string {
  const jokesPath = path.resolve(__dirname, "../jokes.json");
  const jokes = JSON.parse(fs.readFileSync(jokesPath, "utf-8")) as string[];
  const idx = Math.floor(Math.random() * jokes.length);
  const joke = jokes[idx];
  return gradient.rainbow.multiline(joke) || chalk.cyanBright(joke);
}

// If run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(getRandomJoke());
}
