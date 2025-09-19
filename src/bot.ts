import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to use gradient-string for fancy gradients
let applyStyle: (s: string) => string;
try {
  const gradient = await import("gradient-string");
  applyStyle = (s: string) => gradient.rainbow.multiline(s);
} catch {
  applyStyle = (s: string) => chalk.cyanBright(s);
}

export async function typeText(text: string, delay = 30) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const start = Math.max(0, i - (i % 20));
    const end = Math.min(text.length, start + 20);
    const chunk = text.slice(start, end);
    const coloredChunk = applyStyle(chunk);
    const coloredChar = coloredChunk[i - start] ?? char;
    process.stdout.write(coloredChar);
    await new Promise((r) => setTimeout(r, delay));
  }
  console.log("\n");
}

export function getRandomJoke(): string {
  const jokesPath = path.resolve(__dirname, "../jokes.json");
  const jokes = JSON.parse(fs.readFileSync(jokesPath, "utf-8")) as string[];
  const idx = Math.floor(Math.random() * jokes.length);
  return jokes[idx].trim();
}

export function asciiBanner(title = "Dev Joke Bot"): string {
  const banner = [
    "██████╗ ███████╗ ██████╗     ██████╗ ██╗   ██╗     ██╗      ██████╗ ██╗  ██╗",
    "██╔══██╗██╔════╝██╔═══██╗    ██╔══██╗██║   ██║     ██║     ██╔═══██╗██║ ██╔╝",
    "██████╔╝█████╗  ██║   ██║    ██████╔╝██║   ██║     ██║     ██║   ██║█████╔╝ ",
    "██╔═══╝ ██╔══╝  ██║   ██║    ██╔══██╗██║   ██║     ██║     ██║   ██║██╔═██╗ ",
    "██║     ███████╗╚██████╔╝    ██████╔╝╚██████╔╝     ███████╗╚██████╔╝██║  ██╗",
    "╚═╝     ╚══════╝ ╚═════╝     ╚═════╝  ╚═════╝      ╚══════╝ ╚═════╝ ╚═╝  ╚═╝",
  ].join("\n");
  return `${banner}\n\n# ${title}\n`;
}