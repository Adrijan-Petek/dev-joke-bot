#!/usr/bin/env node
import { getRandomJoke, typeText } from "../dist/bot.js";

(async () => {
  const joke = getRandomJoke();
  console.log("\n");
  await typeText(joke, 16);
})();