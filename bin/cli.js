#!/usr/bin/env node
import { getRandomJoke, typeText } from "../dist/bot.js";

(async () => {
  const joke = getRandomJoke();
  await typeText(joke, 20);
})();
