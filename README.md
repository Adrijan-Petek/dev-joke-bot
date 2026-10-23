# Dev Joke Bot


A small Node.js/TypeScript CLI that prints random developer jokes from a local JSON database. The README can be automatically updated on a schedule with a rotating joke via GitHub Actions.

## Features

- Random joke output from a curated dataset (`jokes.json`)
- Category filtering (`--category`) and keyword search (`--search`)
- Joke statistics (`--stats`) and category listing (`--list`)
- Optional colored output themes (`--color`)

## Requirements

- Node.js 18+ (Node 20 recommended)

## Quick start

```bash
npm install
npm run build
npx dev-joke-bot
```

## Usage

```bash
npx dev-joke-bot [options]
```

Options:

- `--help` Show the help menu
- `--list` List all available categories
- `--stats` Show joke statistics
- `--category <name>` Get a joke from a specific category
- `--search <keyword>` Search jokes by text or tag
- `--count <n>` Print multiple random jokes
- `--color <theme>` Set output theme (`pastel`, `rainbow`, `mind`, `retro`)
- `--readme` Output a plain Markdown snippet (for CI/README updates)

Examples:

```bash
npx dev-joke-bot
npx dev-joke-bot --category Git
npx dev-joke-bot --search database --color rainbow
npx dev-joke-bot --count 3
```

## Dev joke (auto-updated)

This section is updated by `.github/workflows/update-joke.yml` on a schedule (every 12 hours, UTC).

<!-- JOKE_START -->
**Category:** General

There are only 10 types of people in the world: those who understand binary and those who don't.
<!-- JOKE_END -->

## Adding jokes

Add entries to `jokes.json`:

```json
{
  "text": "Your joke here",
  "category": "General",
  "tags": ["tag1", "tag2"]
}
```

Guidelines:

- Keep content developer/programming-related
- Use an existing category or add a new one consistently
- Add 1–3 relevant tags to improve search
- Keep it respectful and inclusive

## Project structure

```
.
├── bin/                    # CLI entry point
├── src/                    # TypeScript source
├── dist/                   # Compiled JavaScript (generated)
├── jokes.json              # Joke database
└── .github/workflows/      # Automation (README updates)
```

## Suggested improvements

- Add `npm test` coverage and CI checks (lint, typecheck, tests)
- Add a formatter/linter setup (Prettier/ESLint) for consistent style
- Add a release workflow (changelog + versioning) if publishing to npm
- Add a `--seed` option for reproducible output (useful for demos/CI)

## License

MIT
