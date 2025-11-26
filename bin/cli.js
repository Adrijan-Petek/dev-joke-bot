#!/usr/bin/env node
import {
  getRandomJoke,
  typeText,
  printJoke,
  showHelp,
  listCategories,
  showStats,
  searchJokes,
  getJokesByCategory,
  getRandomJokes,
} from "../dist/bot.js";

async function run() {
  const args = process.argv.slice(2);

  // Show help by default if no arguments
  if (args.includes("--help")) {
    showHelp();
    return;
  }

  if (args.includes("--list")) {
    await listCategories();
    return;
  }

  if (args.includes("--stats")) {
    await showStats();
    return;
  }

  // Parse all options
  const categoryIndex = args.indexOf("--category");
  const searchIndex = args.indexOf("--search");
  const countIndex = args.indexOf("--count");
  const colorIndex = args.indexOf("--color");

  const category = categoryIndex >= 0 ? args[categoryIndex + 1] : null;
  const search = searchIndex >= 0 ? args[searchIndex + 1] : null;
  const count = countIndex >= 0 ? parseInt(args[countIndex + 1], 10) : 1;
  const color = colorIndex >= 0 ? args[colorIndex + 1] : "pastel";

  // Search jokes
  if (search) {
    const results = await searchJokes(search);
    if (results.length === 0) {
      console.log(`No jokes found matching "${search}"`);
      return;
    }
    const joke = results[Math.floor(Math.random() * results.length)];
    await printJoke(joke, color);
    return;
  }

  // Get jokes by category
  if (category) {
    const results = await getJokesByCategory(category);
    if (results.length === 0) {
      console.log(
        `No jokes found in category "${category}". Use --list to see available categories.`
      );
      return;
    }
    const joke = results[Math.floor(Math.random() * results.length)];
    await printJoke(joke, color);
    return;
  }

  // Get multiple jokes
  if (count > 1) {
    const jokes = await getRandomJokes(count);
    for (const joke of jokes) {
      await printJoke(joke, color);
      console.log("---");
    }
    return;
  }

  // Default: single random joke
  const joke = await getRandomJoke();
  await printJoke(joke, color);
}

run().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
