# NextAuth CLI

NextAuth CLI is a command-line interface tool designed to simplify the process of creating base templates and initializing NextAuth.js base templates for users.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

To install the NextAuth CLI, you can use npm:

```bash
npm i -g nextauth-cli@latest
```

## Usage

The CLI provides a set of commands to streamline the setup process for NextAuth.js projects. Here are the available commands:

### `nextauth --router <router-type> --provider <provider> --adapter <adapter> --env --ts`

Creates a new project with the the specified Next.js base template. Options for the following flags are given below.

#### Options:

-   `--env`: Specifies if an additional `.env.example` file is to be generated which includes all the `process.env` variables that are to be used. Default value is **false**.

-   `--ts`: Specifies if the project is **typescript** configured. Default value is **false**.

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

### `nextauth`

Initializes the NextAuth.js base template with **prompts** support.

## Status

-   ✔️ **Partially Fixed**: Some progress has been made, but more work is needed.
-   ✅ **Totally Fixed**: All reported issues have been successfully resolved.
-   ⚒️ **Build in Progress**: Work is currently underway to fix the reported issues.

## Contributing

We welcome contributions from the community! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
