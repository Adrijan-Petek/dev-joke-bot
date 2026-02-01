import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import chalk from "chalk";
import gradient from "gradient-string";
import { Joke, JokesData, CommandOptions } from "./types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CachedData {
  jokes: Joke[];
  stats: Record<string, number>;
}

let cachedData: CachedData | null = null;

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
async function loadJokes(): Promise<Joke[]> {
  if (cachedData) return cachedData.jokes;

  const jokesPath = path.join(__dirname, "..", "jokes.json");
  const fileContents = await fs.readFile(jokesPath, "utf-8");
  const data = JSON.parse(fileContents) as JokesData;

  cachedData = {
    jokes: data.jokes,
    stats: {},
  };

  return cachedData.jokes;
}

// Get a random joke
export async function getRandomJoke(): Promise<Joke> {
  const jokes = await loadJokes();
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// Get multiple random jokes
export async function getRandomJokes(count: number): Promise<Joke[]> {
  const jokes = await loadJokes();
  const selected: Joke[] = [];
  for (let i = 0; i < count; i++) {
    selected.push(jokes[Math.floor(Math.random() * jokes.length)]);
  }
  return selected;
}

// Search jokes by keyword
export async function searchJokes(keyword: string): Promise<Joke[]> {
  const jokes = await loadJokes();
  const lower = keyword.toLowerCase();
  return jokes.filter((joke) =>
    joke.text.toLowerCase().includes(lower) ||
    joke.tags.some((tag) => tag.toLowerCase().includes(lower))
  );
}

// Get jokes by category
export async function getJokesByCategory(category: string): Promise<Joke[]> {
  const jokes = await loadJokes();
  return jokes.filter(
    (joke) => joke.category.toLowerCase() === category.toLowerCase()
  );
}

// Get all available categories
export async function getCategories(): Promise<string[]> {
  const jokes = await loadJokes();
  const categories = new Set(jokes.map((j) => j.category));
  return Array.from(categories).sort();
}

export function formatJokeForReadme(joke: Joke): string {
  return `**Category:** ${joke.category}\n\n${joke.text.trimEnd()}\n`;
}

// Print joke with optional color theme
export async function printJoke(
  joke: Joke,
  theme: "pastel" | "rainbow" | "mind" | "retro" = "pastel"
) {
  const colorThemes = {
    pastel: (text: string) => gradient.pastel.multiline(text),
    rainbow: (text: string) => gradient.rainbow.multiline(text),
    mind: (text: string) => gradient.mind.multiline(text),
    retro: (text: string) => gradient.retro.multiline(text),
  };

  const coloredTitle = colorThemes[theme]("💻 Dev Joke 💻");
  console.log(coloredTitle);
  console.log(chalk.dim(`📂 Category: ${joke.category}`));
  console.log();
  await typeText(joke.text, 10);
}

// Show help information
export function showHelp() {
  console.log(gradient.pastel.multiline("╔════════════════════════════════╗"));
  console.log(gradient.pastel.multiline("║   Dev Joke Bot - Help Menu     ║"));
  console.log(gradient.pastel.multiline("╚════════════════════════════════╝"));
  console.log();
  console.log(chalk.bold("Usage:"));
  console.log("  npx dev-joke-bot [options]");
  console.log();
  console.log(chalk.bold("Options:"));
  console.log("  --help              Show this help message");
  console.log("  --list              List all available categories");
  console.log("  --stats             Show joke statistics");
  console.log("  --category <name>   Get joke from specific category");
  console.log("  --search <keyword>  Search jokes by keyword");
  console.log("  --count <n>         Get n random jokes (default: 1)");
  console.log("  --color <theme>     Color theme (pastel/rainbow/mind/retro)");
  console.log("  --readme            Output plain Markdown (for README updates)");
  console.log();
  console.log(chalk.bold("Examples:"));
  console.log("  npx dev-joke-bot");
  console.log("  npx dev-joke-bot --category Git");
  console.log("  npx dev-joke-bot --search database --color rainbow");
  console.log("  npx dev-joke-bot --count 3");
  console.log();
}

// List all categories
export async function listCategories() {
  const categories = await getCategories();
  console.log(gradient.pastel.multiline("╔════════════════════════════════╗"));
  console.log(gradient.pastel.multiline("║   Available Categories         ║"));
  console.log(gradient.pastel.multiline("╚════════════════════════════════╝"));
  console.log();
  categories.forEach((cat, idx) => {
    console.log(chalk.cyan(`  ${idx + 1}. ${cat}`));
  });
  console.log();
}

// Show statistics
export async function showStats() {
  const jokes = await loadJokes();
  const categories = await getCategories();
  const stats: Record<string, number> = {};

  jokes.forEach((joke) => {
    stats[joke.category] = (stats[joke.category] || 0) + 1;
  });

  console.log(gradient.pastel.multiline("╔════════════════════════════════╗"));
  console.log(gradient.pastel.multiline("║      Joke Statistics           ║"));
  console.log(gradient.pastel.multiline("╚════════════════════════════════╝"));
  console.log();
  console.log(chalk.bold(`Total Jokes: ${jokes.length}`));
  console.log(chalk.bold(`Total Categories: ${categories.length}`));
  console.log();
  console.log(chalk.bold("Jokes per Category:"));
  categories.forEach((cat) => {
    const count = stats[cat] || 0;
    const bar = "█".repeat(Math.ceil(count / 2));
    console.log(chalk.cyan(`  ${cat.padEnd(15)} ${bar} ${count}`));
  });
  console.log();
}

// Main entry point
async function main() {
  const args = process.argv.slice(2);
  const options: CommandOptions = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help") {
      options.help = true;
    } else if (arg === "--readme") {
      options.readme = true;
    } else if (arg === "--list") {
      options.list = true;
    } else if (arg === "--stats") {
      options.stats = true;
    } else if (arg === "--category") {
      options.category = args[++i];
    } else if (arg === "--search") {
      options.search = args[++i];
    } else if (arg === "--count") {
      options.count = parseInt(args[++i], 10);
    } else if (arg === "--color") {
      options.color = args[++i] as any;
    }
  }

  // Handle help
  if (options.help) {
    showHelp();
    return;
  }

  // Output a plain Markdown snippet (used by CI/README updates)
  if (options.readme) {
    const joke = await getRandomJoke();
    process.stdout.write(formatJokeForReadme(joke));
    return;
  }

  // Handle list categories
  if (options.list) {
    await listCategories();
    return;
  }

  // Handle stats
  if (options.stats) {
    await showStats();
    return;
  }

  // Handle search
  if (options.search) {
    const results = await searchJokes(options.search);
    if (results.length === 0) {
      console.log(
        chalk.yellow(`No jokes found matching "${options.search}"`)
      );
      return;
    }
    const joke = results[Math.floor(Math.random() * results.length)];
    await printJoke(joke, options.color || "pastel");
    return;
  }

  // Handle category
  if (options.category) {
    const results = await getJokesByCategory(options.category);
    if (results.length === 0) {
      console.log(
        chalk.yellow(
          `No jokes found in category "${options.category}". Use --list to see available categories.`
        )
      );
      return;
    }
    const joke = results[Math.floor(Math.random() * results.length)];
    await printJoke(joke, options.color || "pastel");
    return;
  }

  // Handle multiple jokes
  if (options.count && options.count > 1) {
    const jokes = await getRandomJokes(options.count);
    for (const joke of jokes) {
      await printJoke(joke, options.color || "pastel");
      console.log(chalk.dim("---"));
    }
    return;
  }

  // Default: single random joke
  const joke = await getRandomJoke();
  await printJoke(joke, options.color || "pastel");
}

const isDirectRun =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isDirectRun) {
  main().catch((err) => {
    console.error(chalk.red("Error:"), err.message);
    process.exit(1);
  });
}
