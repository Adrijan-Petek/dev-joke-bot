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

  const jokesPath = path.join(__dirname, "jokes.json"); // adjust path if needed
  const fileContents = await fs.readFile(jokesPath, "utf-8");
  const jokes = JSON.parse(fileContents) as string[];

  cachedJokes = jokes;
  return jokes;
}

async function getRandomJoke(): Promise<string> {
  const jokes = await loadJokes();
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// Main entry point used by your GitHub Action: `node dist/bot.js`
async function main() {
  const joke = await getRandomJoke();

  // Fancy title (optional, but you’re importing gradient & chalk)
  const title = gradient.pastel.multiline("💻 Dev Joke of the Day 💻");
  console.log(title);
  console.log();

  // If you want just plain output for the Action, replace this with `console.log(joke);`
  await typeText(joke, 10);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
