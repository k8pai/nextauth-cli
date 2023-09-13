# What's nextauth-cli

A cli tool to initialize nextauth setup with a simple command.

## Commands and it's use

### Syntax

```bash
nextauth init [options] [command]
```

### **Commands**

-   `next-app` - For Next.js Projects with a **'/pages'** Router setup.
-   `next-pages` - For Next.js Projects with a **'/pages'** Router setup.

### **Options**

**Provider Flags**

-   `--Apple` - Adds Apple Provider.
-   `--Atlassian` - Adds Atlassian Provider.
-   `--Auth0` - Adds Auth0 Provider.
-   `--Authentik` - Adds Authentik Provider.
-   `--AzureAD` - Adds AzureAD Provider.
-   `--AzureB2C` - Adds AzureB2C Provider.
-   `--Battlenet` - Adds Battlenet Provider.
-   `--Box` - Adds Box Provider.
-   `--BoxyHQSAML` - Adds BoxyHQSAML Provider.
-   `--Bungie` - Adds Bungie Provider.
-   `--Cognito` - Adds Cognito Provider.
-   `--Coinbase` - Adds Coinbase Provider.
-   `--Discord` - Adds Discord Provider.
-   `--Dropbox` - Adds Dropbox Provider.
-   `--DuendeIDS6` - Adds DuendeIDS6 Provider.
-   `--Eveonline` - Adds Eveonline Provider.
-   `--Facebook` - Adds Facebook Provider.
-   `--Faceit` - Adds Faceit Provider.
-   `--FortyTwoSchool` - Adds FortyTwoSchool Provider.
-   `--Foursquare` - Adds Foursquare Provider.
-   `--Freshbooks` - Adds Freshbooks Provider.
-   `--Fusionauth` - Adds Fusionauth Provider.
-   `--GitHub` - Adds GitHub Provider.
-   `--Gitlab` - Adds Gitlab Provider.
-   `--Google` - Adds Google Provider.
-   `--Hubspot` - Adds Hubspot Provider.
-   `--Instagram` - Adds Instagram Provider.
-   `--Kakao` - Adds Kakao Provider.
-   `--Keycloak` - Adds Keycloak Provider.
-   `--Line` - Adds Line Provider.
-   `--LinkedIn` - Adds LinkedIn Provider.
-   `--Mailchimp` - Adds Mailchimp Provider.
-   `--Mailru` - Adds Mailru Provider.
-   `--Medium` - Adds Medium Provider.
-   `--Naver` - Adds Naver Provider.
-   `--Netlify` - Adds Netlify Provider.
-   `--Okta` - Adds Okta Provider.
-   `--Onelogin` - Adds Onelogin Provider.
-   `--Osso` - Adds Osso Provider.
-   `--Osu` - Adds Osu Provider.
-   `--Passage` - Adds Passage Provider.
-   `--Patreon` - Adds Patreon Provider.
-   `--Pinterest` - Adds Pinterest Provider.
-   `--Pipedrive` - Adds Pipedrive Provider.
-   `--Reddit` - Adds Reddit Provider.
-   `--Salesforce` - Adds Salesforce Provider.
-   `--Slack` - Adds Slack Provider.
-   `--Spotify` - Adds Spotify Provider.
-   `--Strava` - Adds Strava Provider.
-   `--Todoist` - Adds Todoist Provider.
-   `--Trakt` - Adds Trakt Provider.
-   `--Twitch` - Adds Twitch Provider.
-   `--Twitter` - Adds Twitter Provider.
-   `--UnitedEffects` - Adds UnitedEffects Provider.
-   `--Vk` - Adds Vk Provider.
-   `--Wikimedia` - Adds Wikimedia Provider.
-   `--Wordpress` - Adds Wordpress Provider.
-   `--WorkOS` - Adds WorkOS Provider.
-   `--Yandex` - Adds Yandex Provider.
-   `--Zitadel` - Adds Zitadel Provider.
-   `--Zoho` - Adds Zoho Provider.
-   `--Zoom` - Adds Zoom Provider.

**Configuration Flags**

-   `--env` - Create or Update `.env.example` file with all provider variables that has to be declared!
-   `--ts` - Provide if you have a typescript project setup or not. `js` files are created by Default.

**Help**

-   `-h`, `--help` - display help for command.

---

### Base Initialization ⚒️

-   Configures `/api/auth/[...nextauth].js` | `/api/auth/[...nextauth]/route.js` files, with base configuration of `nextauth`.
-   Adds a `GitHubProvider` Provider to the base auth file.

For Next.js Projects with _/app_ folder structure

```bash
nextauth next-app --GitHub
```

For Next.js Projects with _/pages_ folder structure

```bash
nextauth next-pages --GitHub
```

### Configuration of .env file. ✅

-   Comes with the base Configuration along with a sample `.env.example` file with all the `ID` and `SECRET` variables used mentioned.
-   We don't want to peek in your `.env` files, hence `.env.example`. 🫣

For Next.js Projects with _/app_ folder structure

```bash
nextauth next-app --GitHub --env
```

For Next.js Projects with _/pages_ folder structure

```bash
nextauth next-pages --GitHub --env
```

### Configuration for typescript projects. ✔️

-   `--ts` flag generates **.ts** files in the project structure with typesafety. If not specified files with `.js` extentions are created by default.

For Next.js Projects with _/app_ folder structure

```bash
nextauth next-app --GitHub --env --ts
```

For Next.js Projects with _/pages_ folder structure

```bash
nextauth next-pages --GitHub --env --ts
```

### Configuration for projects with Adapters. ✔️

-   `--adapter` flags generates **adapters** in the `[...nextauth].{ts/js}` | `route.{ts/js}` files. By default no Adapters are generated.
-   `--adapter` takes in an argument, of type `AdapterType` which includes **16** adapters that are currently supported by [authjs.dev](https://authjs.dev/reference/adapters).
-   Checkout the status of all the adapters that are currently ready to use, and under updation.

For Next.js Projects with _/app_ folder structure

```bash
nextauth next-app --GitHub --env --ts --adapter prisma
```

OR

```bash
nextauth next-app --GitHub --env --ts --adapter=prisma
```

For Next.js Projects with _/pages_ folder structure

```bash
nextauth next-pages --GitHub --env --ts --adapter prisma
```

OR

```bash
nextauth next-pages --GitHub --env --ts --adapter=prisma
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
