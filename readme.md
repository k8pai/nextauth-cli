# NextAuth CLI

NextAuth CLI is a command-line interface tool designed to simplify the process of creating base templates and initializing NextAuth.js base templates for users.

## Table of Contents

-   [Installation](#installation)
-   [Commands](#commands)
    -   [Next.js Specific Commands](#nextauth)
    -   [Sveletekit Specific Commands](#svelteauth)
    -   [Solid Specific Commands](#solidauth)
-   [Usage](#usage)
-   [Example](#example)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

To install the NextAuth CLI, you can use npm:

```bash
npm i -g nextauth-cli@latest
```

## Commands

The CLI provides a set of commands to streamline the setup process for **NextAuth.js**, **Sveltekit** and **Solid** | **Solid-start** projects. Below are the available commands for each project type:

### Nextauth

1. **For Nextjs Projects**

```bash
nextauth --router <router-type> --provider <provider> --adapter <adapter> --secret --env --ts
```

### Svelteauth

2. **For Sveltekit Projects**

```bash
svelteauth --provider <provider> --adapter <adapter> --dynamic --secret --env --ts
```

### Solidauth

3. **For Solid | Solid-start Projects**

```bash
solidauth --provider <provider> --adapter <adapter> --secret --env --ts
```

## Usage

Efficiently set up your authentication flow with **NextAuth.js**, **Sveltekit**, or **Solid** | **Solid-start** projects using the provided CLI commands:

1. **Commands with flags.**

```bash
nextauth --router <router-type> --provider <provider> --adapter <adapter> --secret --env --ts
```

Creates a new project with the the specified Next.js base template. Options for the following flags are given below.

#### Options:

-   `--env`: Specifies if an additional `.env.example` file is to be generated which includes all the `process.env` variables that are to be used. Default value is **false**.

-   `--ts`: Specifies if the project is **typescript** configured. Default value is **false**.

-   `--secret`: Specifies if NextAuth options should include a secret field.

-   `--router <router-type>`: Specifies the type of Next.js router to be used. Available options:

    -   `app` ✅
    -   `pages` ✅
    -   `src` ⚒️

-   `--adapter <adapter>`: Specifies the adapter used for the project. Available options:

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

-   `--provider <provider>`: Specifies the authentication provider(s) to be used for the project. Available options:
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

2. **Commands with prompts support.**

The CLI ensures a seamless setup process by offering a prompt-based support to configure your specific project requirements. This interactive approach allows you to customize the authentication flow according to your needs effortlessly.

## Example

**Nextjs**

```bash
nextauth --router app --provider Google --adapter mongodb --env --ts --secret
```

In this example:

-   `--router app`: Specifies that the project will use the Next.js router with the "**app**" type.
-   `--provider Google`: Specifies that Google authentication will be used.
-   `--adapter mongodb`: Specifies that the project will use MongoDB as the database adapter.
-   `--env`: Indicates that an additional `.env.example` file will be generated.
-   `--ts`: Specifies that the project will be configured for TypeScript.
-   `--secret`: Indicates that NextAuth options will include a secret field.

**Sveltekit**

```bash
svelteauth --provider Google --adapter mongodb --env --ts --secret --dynamic
```

In this example:

-   `--provider Google`: Specifies that Google authentication will be used.
-   `--adapter mongodb`: Specifies that the project will use MongoDB as the database adapter.
-   `--env`: Indicates that an additional `.env.example` file will be generated.
-   `--ts`: Specifies that the project will be configured for TypeScript.
-   `--secret`: Indicates that NextAuth options will include a secret field.
-   `--dynamic`: Specifies that the module provides access to runtime environment variables, as defined by the platform you're running on.

**Solid**

```bash
solidauth --provider Google --adapter prisma --env --ts --secret --db mongodb
```

In this example:

-   `--provider Google`: Specifies that Google authentication will be used.
-   `--adapter prisma`: Specifies that the project will use Prisma as the database adapter.
-   `--db mongodb`: Specifies that Prisma adapter uses `MongoDb` as it's database.
-   `--env`: Indicates that an additional `.env.example` file will be generated.
-   `--ts`: Specifies that the project will be configured for TypeScript.
-   `--secret`: Indicates that NextAuth options will include a secret field.

Feel free to modify the options and values based on your specific use case.

## Status

-   ✔️ **Partially Fixed**: Some progress has been made, but more work is needed.
-   ✅ **Totally Fixed**: All reported issues have been successfully resolved.
-   ⚒️ **Build in Progress**: Work is currently underway to fix the reported issues.

## Contributing

We welcome contributions from the community! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
