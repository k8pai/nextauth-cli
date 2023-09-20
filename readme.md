# What's nextauth-cli

A cli tool to initialize nextauth setup with a simple command.

## Commands and it's use

### Installation

```bash
npm i -g nextauth-cli@latest
```

---

### Base Initialization ⚒️

-   Configures `/api/auth/[...nextauth].js` | `/api/auth/[...nextauth]/route.js` files, with base configuration of `nextauth`.
-   Adds a `GitHubProvider` Provider to the base auth file.

```bash
nextauth --GitHub
```

### Configuration of .env file. ✅

-   Comes with the base Configuration along with a sample `.env.example` file with all the `ID` and `SECRET` variables used mentioned.
-   We don't want to peek in your `.env` files, hence `.env.example`. 🫣

```bash
nextauth --GitHub --env
```

### Configuration for typescript projects. ✔️

-   `--ts` flag generates **.ts** files in the project structure with typesafety. If not specified files with `.js` extentions are created by default.

```bash
nextauth --GitHub --env --ts
```

### Configuration for projects with Adapters. ✔️

-   `--adapter` flags generates **adapters** in the `[...nextauth].{ts/js}` | `route.{ts/js}` files. By default no Adapters are generated.
-   `--adapter` takes in an argument, of type `AdapterType` which includes **16** adapters that are currently supported by [authjs.dev](https://authjs.dev/reference/adapters).
-   Checkout the status of all the adapters that are currently ready to use, and under updation.

```bash
nextauth --GitHub --env --ts --adapter prisma
```

## Adapters Support

-   `dgraph`✅
-   `drizzle`✅
-   `dynamodb`✅
-   `fauna`✅
-   `firebase`✅
-   `kysely`✅
-   `mikro-orm`⚒️
-   `mongodb`✅
-   `neo4j`✅
-   `pouchdb`⚒️
-   `prisma` ✅
-   `sequalize`✅
-   `supabase`✅
-   `typeorm`✅
-   `upstash-redis`✅
-   `xata`⚒️

## Provider Support

-   `Apple` ✅
-   `Atlassian` ✅
-   `Auth0` ✅
-   `Authentik` ✅
-   `AzureAD` ✅
-   `AzureB2C` ✅
-   `Battlenet` ✅
-   `Box` ✅
-   `BoxyHQSAML` ✅
-   `Bungie` ✅
-   `Cognito` ✅
-   `Coinbase` ✅
-   `Credentials` ✅
-   `Discord` ✅
-   `Dropbox` ✅
-   `DuendeIDS6` ✅
-   `Email` ✅
-   `Eveonline` ✅
-   `Facebook` ✅
-   `Faceit` ✅
-   `FortyTwoSchool` ✅
-   `Foursquare` ✅
-   `Freshbooks` ✅
-   `Fusionauth` ✅
-   `GitHub` ✅
-   `Gitlab` ✅
-   `Google` ✅
-   `Hubspot` ✅
-   `Instagram` ✅
-   `Kakao` ✅
-   `Keycloak` ✅
-   `Line` ✅
-   `LinkedIn` ✅
-   `Mailchimp` ✅
-   `Mailru` ✅
-   `Medium` ✅
-   `Naver` ✅
-   `Netlify` ✅
-   `Okta` ✅
-   `Onelogin` ✅
-   `Osso` ✅
-   `Osu` ✅
-   `Passage` ✅
-   `Patreon` ✅
-   `Pinterest` ✅
-   `Pipedrive` ✅
-   `Reddit` ✅
-   `Salesforce` ✅
-   `Slack` ✅
-   `Spotify` ✅
-   `Strava` ✅
-   `Todoist` ✅
-   `Trakt` ✅
-   `Twitch` ✅
-   `Twitter` ✅
-   `UnitedEffects` ✅
-   `Vk` ✅
-   `Wikimedia` ✅
-   `Wordpress` ✅
-   `WorkOS` ✅
-   `Yandex` ✅
-   `Zitadel` ✅
-   `Zoho` ✅
-   `Zoom` ✅

## Fixes to be made.

-   Adapters `xata`, `pouchdb` and `mikro-orm` are to be made effective. ✔️
-   Fix `route.ts` file exports for latest **Next.js 13.4+** versions. ✔️
-   Fix `src/pages` directory structure. ☑️

## What-Status

-   ✔️: "Partially Fixed.",
-   ✅: "Totally Fixed issues",
-   ⚒️: "Build on Progress",
-   ☑️: "Broken Command",
-   🎟️: "Bug and doesnt work",
-   🎫: "Bug present, but works. Upgrade on the way.",

## Upcoming Updates

-   Support for `email` providers.
-   Support for `OAuth` Providers.
-   Support for `Credentials` Providers.
