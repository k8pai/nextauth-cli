# What's nextauth-cli

A cli tool to initialize nextauth setup with a simple command.

## Commands and it's use

### Syntax

```bash
nextauth-init <directory> --options
```

**Arguments**

-   `directory` - Next.js directory structure: '_src_' for /src/pages router, '_pages_' for /pages router, '_app_' for /app router. (choices: "**src**","**pages**", "**app**")

**Options**

-   `--github` - Adds github Provider.
-   `--google` - Adds Google Provider.
-   `--env` - Create or Update `.env.example` file with all provider variables that has to be declared!
-   `--ts` - Provide if you have a typescript project setup or not. Default js files are created...
-   `-h`, `--help` - display help for command

#### Base Initialization

-   Configures `/api/auth/[...nextauth].js` | `/api/auth/[...nextauth]/route.js` files, with base configuration of `nextauth`.
-   Adds a `GithubProvider` Provider to the base auth file.

```bash
nextauth-init app --github
```

#### Configuration of .env file.

-   Comes with the base Configuration along with a sample `.env.example` file with all the `ID` and `SECRET` variables used mentioned.
-   We don't want to peek in your `.env` files, hence `.env.example`. 🫣

```bash
nextauth-init app --github --env
```

## Fixes to be made.

-   Fix `--ts` flag for all routes. ☑️
-   Fix `src/pages` directory structure. ☑️
-   Rename commands. ✔️
-   Meaningful Comments in `.env.example` File. ✅
-   Base Configuration. 🎫

## What-Status

-   ✔️: "Partially Fixed.",
-   ✅: "Totally Fixed issues",
-   ⚒️: "Build on Progress",
-   ☑️: "Broken Command",
-   🎟️: "Bug and doesnt work",
-   🎫: "Bug present, but works. Upgrade on the way.",
