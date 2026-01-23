
````markdown
██████╗ ███████╗ ██████╗     ██████╗ ██╗   ██╗     ██╗      ██████╗ ██╗  ██╗
██╔══██╗██╔════╝██╔═══██╗    ██╔══██╗██║   ██║     ██║     ██╔═══██╗██║ ██╔╝
██████╔╝█████╗  ██║   ██║    ██████╔╝██║   ██║     ██║     ██║   ██║█████╔╝
██╔═══╝ ██╔══╝  ██║   ██║    ██╔══██╗██║   ██║     ██║     ██║   ██║██╔═██╗
██║     ███████╗╚██████╔╝    ██████╔╝╚██████╔╝     ███████╗╚██████╔╝██║  ██║
╚═╝     ╚══════╝ ╚═════╝     ╚═════╝  ╚═════╝      ╚══════╝ ╚═════╝ ╚═╝  ╚═╝

# 😂 Dev Joke Bot - Enhanced Edition

Welcome to the **funniest repo on GitHub**. This README is automatically updated every 12 hours with a new dev joke.

---

## Features ✨

- ✅ **10 Categories** - Jokes organized by topic (Git, SQL, Languages, Debugging, etc.)
- ✅ **Search Functionality** - Find jokes by keyword or tag
- ✅ **Category Filtering** - Get jokes from specific categories
- ✅ **Multiple Jokes** - Fetch several random jokes at once
- ✅ **Color Themes** - 4 beautiful gradient themes (pastel, rainbow, mind, retro)
- ✅ **Statistics** - View joke distribution across categories
- ✅ **Typing Animation** - Jokes are displayed with a cool typing effect
- ✅ **CLI Support** - Full command-line interface with help menu

---

## Quick Start

```bash
npm install
npm run build
npx dev-joke-bot
```

---

## Usage & Commands

### Get a Random Joke
```bash
npx dev-joke-bot
```

### Show Help Menu
```bash
npx dev-joke-bot --help
```

### List All Categories
```bash
npx dev-joke-bot --list
```

### View Statistics
```bash
npx dev-joke-bot --stats
```

### Get Joke from Specific Category
```bash
npx dev-joke-bot --category Git
npx dev-joke-bot --category SQL
npx dev-joke-bot --category Debugging
```

### Search for Jokes
```bash
npx dev-joke-bot --search database
npx dev-joke-bot --search coffee
npx dev-joke-bot --search recursion
```

### Get Multiple Jokes
```bash
npx dev-joke-bot --count 5
```

### Change Color Theme
```bash
npx dev-joke-bot --color rainbow
npx dev-joke-bot --color mind
npx dev-joke-bot --color retro
```

### Combine Options
```bash
npx dev-joke-bot --category Git --count 2
npx dev-joke-bot --search database --color rainbow
npx dev-joke-bot --category Languages --color mind
```

---

## Available Categories

- **Algorithms** - Algorithm jokes
- **Debugging** - Debugging humor
- **General** - Mixed programming jokes
- **Git** - Version control jokes
- **Languages** - Programming language jokes
- **Network** - Network and internet jokes
- **OS** - Operating system jokes
- **SQL** - Database jokes
- **Testing** - Testing and QA jokes
- **UI/UX** - User interface jokes

---

## Project Structure

```
.
├── bin/
│   └── cli.js              # Command-line interface entry point
├── src/
│   ├── bot.ts              # Core bot functionality with all features
│   └── types/
│       ├── index.ts        # TypeScript interfaces and types
│       └── gradient-string.d.ts
├── dist/                   # Compiled JavaScript (auto-generated)
├── jokes.json             # Joke database with categories and tags
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

---

## Dev Joke (auto-updated every 12 hours)

<!-- JOKE_START -->
💻 Dev Joke 💻
📂 Category: General

Programmer's spouse: 'Go to the store and get a loaf of bread. If they have eggs, get a dozen.' Programmer comes back with 12 loaves of bread.| | | | | 


<!-- JOKE_END -->

---

## Adding Your Own Jokes

Edit `jokes.json` and add new jokes in the following format:

```json
{
  "text": "Your hilarious joke here",
  "category": "General",
  "tags": ["tag1", "tag2"]
}
```

### Guidelines
- Choose an appropriate category or create a new one
- Add 1-3 relevant tags for searchability
- Keep jokes programming/developer related
- Be respectful and inclusive

---

## Technologies Used

- **TypeScript** - Type-safe development
- **Chalk** - Terminal colors
- **Gradient-String** - Beautiful gradient effects
- **Node.js** - JavaScript runtime

---

## Contributions Welcome! 🎉

Have a funny dev joke? Want to add more features? Submit a PR or issue!

### How to Contribute
1. Fork the repository
2. Add your jokes or features
3. Submit a pull request
4. That's it!

---

## License

MIT - Feel free to use this however you want!

--- 

Made with ❤️ and lots of ☕
````
