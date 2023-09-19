import { CredentialOptions } from '../templates';

export const providers = {
	Apple: {
		name: 'Apple',
		importOptions: [
			{
				defaultImport: true,
				name: 'AppleProvider',
				path: 'next-auth/providers/apple',
			},
		],
		importName: 'AppleProvider',
		path: 'apple',
		options: {
			Generator: false,
			clientId: 'APPLE_ID',
			clientSecret: 'APPLE_SECRET',
		},
	},
	Asgardeo: {
		name: 'Asgardeo',
		importOptions: [
			{
				defaultImport: true,
				name: 'AsgardeoProvider',
				path: 'next-auth/providers/asgardeo',
			},
		],
		importName: 'AsgardeoProvider',
		path: 'asgardeo',
		options: {
			Generator: false,
			clientId: 'ASGARDEO_ID',
			clientSecret: 'ASGARDEO_SECRET',
			issuer: 'ASGARDEO_ISSUER',
		},
	},
	Atlassian: {
		name: 'Atlassian',
		importOptions: [
			{
				defaultImport: true,
				name: 'AtlassianProvider',
				path: 'next-auth/providers/atlassian',
			},
		],
		importName: 'AtlassianProvider',
		path: 'atlassian',
		options: {
			Generator: false,
			clientId: 'ATLASSIAN_ID',
			clientSecret: 'ATLASSIAN_SECRET',
		},
	},
	Auth0: {
		name: 'Auth0',
		importOptions: [
			{
				defaultImport: true,
				name: 'Auth0Provider',
				path: 'next-auth/providers/auth0',
			},
		],
		importName: 'Auth0Provider',
		path: 'auth0',
		options: {
			Generator: false,
			clientId: 'AUTH0_ID',
			clientSecret: 'AUTH0_SECRET',
			issuer: 'AUTH0_ISSUER',
		},
	},
	Authentik: {
		name: 'Authentik',
		importOptions: [
			{
				defaultImport: true,
				name: 'AuthentikProvider',
				path: 'next-auth/providers/authentik',
			},
		],
		importName: 'AuthentikProvider',
		path: 'authentik',
		options: {
			Generator: false,
			clientId: 'AUTHENTIK_ID',
			clientSecret: 'AUTHENTIK_SECRET',
		},
	},
	AzureAD: {
		name: 'AzureAD',
		importOptions: [
			{
				defaultImport: true,
				name: 'AzureADProvider',
				path: 'next-auth/providers/azure-ad',
			},
		],
		importName: 'AzureADProvider',
		path: 'azure-ad',
		options: {
			Generator: false,
			clientId: 'AZUREAD_ID',
			clientSecret: 'AZUREAD_SECRET',
		},
	},
	AzureB2C: {
		name: 'AzureB2C',
		importOptions: [
			{
				defaultImport: true,
				name: 'AzureADB2CProvider',
				path: 'next-auth/providers/azure-ad-b2c',
			},
		],
		importName: 'AzureADB2CProvider',
		path: 'azure-ad-b2c',
		options: {
			Generator: false,
			clientId: 'AZUREB2C_ID',
			clientSecret: 'AZUREB2C_SECRET',
		},
	},
	AzureDevOps: {
		name: 'AzureDevOps',
		importOptions: [
			{
				defaultImport: true,
				name: 'AzureDevOpsProvider',
				path: 'next-auth/providers/azure-devops',
			},
		],
		importName: 'AzureDevOpsProvider',
		path: 'azure-devops',
		options: {
			Generator: false,
			clientId: 'AZURE_DEVOPS_ID',
			clientSecret: 'AZURE_DEVOPS_SECRET',
			scope: 'AZURE_DEVOPS_SCOPE',
		},
	},
	Battlenet: {
		name: 'Battlenet',
		importOptions: [
			{
				defaultImport: true,
				name: 'BattleNetProvider',
				path: 'next-auth/providers/battlenet',
			},
		],
		importName: 'BattleNetProvider',
		path: 'battlenet',
		options: {
			Generator: false,
			clientId: 'BN_ID',
			clientSecret: 'BN_SECRET',
			issuer: {
				name: 'BN_ISSUER',
				type: '"https://www.battlenet.com.cn/oauth" | "https://us.battle.net/oauth" | "https://eu.battle.net/oauth" | "https://kr.battle.net/oauth" | "https://tw.battle.net/oauth"',
			},
		},
	},
	BeyondIdentity: {
		name: 'BeyondIdentity',
		importOptions: [
			{
				defaultImport: true,
				name: 'BeyondIdentityProvider',
				path: 'next-auth/providers/beyondidentity',
			},
		],
		importName: 'BeyondIdentityProvider',
		path: 'beyondidentity',
		options: {
			Generator: false,
			clientId: 'BEYOND_IDENTITY_ID',
			clientSecret: 'BEYOND_IDENTITY_SECRET',
			issuer: 'BEYOND_IDENTITY_ISSUER',
		},
	},
	Box: {
		name: 'Box',
		importOptions: [
			{
				defaultImport: true,
				name: 'BoxProvider',
				path: 'next-auth/providers/box',
			},
		],
		importName: 'BoxProvider',
		path: 'box',
		options: {
			Generator: false,
			clientId: 'BOX_ID',
			clientSecret: 'BOX_SECRET',
		},
	},
	BoxyHQSAML: {
		name: 'BoxyHQSAML',
		importOptions: [
			{
				defaultImport: true,
				name: 'BoxyHQSAMLProvider',
				path: 'next-auth/providers/boxyhq-saml',
			},
		],
		importName: 'BoxyHQSAMLProvider',
		path: 'boxyhq-saml',
		options: {
			Generator: false,
			clientId: 'BOXYHQ_ID',
			clientSecret: 'BOXYHQ_SECRET',
			issuer: 'BOXYHQ_ISSUER',
		},
		issuer: 'BOXYHQ_ISSUER',
	},
	Bungie: {
		name: 'Bungie',
		importOptions: [
			{
				defaultImport: true,
				name: 'BungieProvider',
				path: 'next-auth/providers/bungie',
			},
		],
		importName: 'BungieProvider',
		path: 'bungie',
		options: {
			Generator: false,
			clientId: 'BUNGIE_ID',
			clientSecret: 'BUNGIE_SECRET',
		},
	},
	Cognito: {
		name: 'Cognito',
		importOptions: [
			{
				defaultImport: true,
				name: 'CognitoProvider',
				path: 'next-auth/providers/cognito',
			},
		],
		importName: 'CognitoProvider',
		path: 'cognito',
		options: {
			Generator: false,
			clientId: 'COGNITO_ID',
			clientSecret: 'COGNITO_SECRET',
		},
	},
	Coinbase: {
		name: 'Coinbase',
		importOptions: [
			{
				defaultImport: true,
				name: 'CoinbaseProvider',
				path: 'next-auth/providers/coinbase',
			},
		],
		importName: 'CoinbaseProvider',
		path: 'coinbase',
		options: {
			Generator: false,
			clientId: 'COINBASE_ID',
			clientSecret: 'COINBASE_SECRET',
		},
	},
	Credentials: {
		name: 'Credentials',
		importOptions: [
			{
				defaultImport: true,
				name: 'CredentialsProvider',
				path: 'next-auth/providers/credentials',
			},
		],
		importName: 'CredentialsProvider',
		path: 'credentials',
		options: {
			Generator: CredentialOptions,
		},
	},
	Descope: {
		name: 'Descope',
		importOptions: [
			{
				defaultImport: true,
				name: 'DescopeProvider',
				path: 'next-auth/providers/descope',
			},
		],
		importName: 'DescopeProvider',
		path: 'descope',
		options: {
			Generator: false,
			clientId: 'DESCOPE_ID',
			clientSecret: 'DESCOPE_SECRET',
		},
	},
	Dribbble: {
		name: 'Dribbble',
		importOptions: [
			{
				defaultImport: true,
				name: 'DribbbleProvider',
				path: 'next-auth/providers/dribbble',
			},
		],
		importName: 'DribbbleProvider',
		path: 'dribbble',
		options: {
			Generator: false,
			clientId: 'DRIBBBLE_ID',
			clientSecret: 'DRIBBBLE_SECRET',
		},
	},
	Discord: {
		name: 'Discord',
		importOptions: [
			{
				defaultImport: true,
				name: 'DiscordProvider',
				path: 'next-auth/providers/discord',
			},
		],
		importName: 'DiscordProvider',
		path: 'discord',
		options: {
			Generator: false,
			clientId: 'DISCORD_ID',
			clientSecret: 'DISCORD_SECRET',
		},
	},
	Dropbox: {
		name: 'Dropbox',
		importOptions: [
			{
				defaultImport: true,
				name: 'DropboxProvider',
				path: 'next-auth/providers/dropbox',
			},
		],
		importName: 'DropboxProvider',
		path: 'dropbox',
		options: {
			Generator: false,
			clientId: 'DROPBOX_ID',
			clientSecret: 'DROPBOX_SECRET',
		},
	},
	DuendeIDS6: {
		name: 'DuendeIDS6',
		importOptions: [
			{
				defaultImport: true,
				name: 'DuendeIDS6Provider',
				path: 'next-auth/providers/duende-identity-server6',
			},
		],
		importName: 'DuendeIDS6Provider',
		path: 'duende-identity-server6',
		options: {
			Generator: false,
			clientId: 'DUENDEIDS6_ID',
			clientSecret: 'DUENDEIDS6_SECRET',
		},
	},
	Email: {
		name: 'Email',
		importOptions: [
			{
				defaultImport: true,
				name: 'EmailProvider',
				path: 'next-auth/providers/email',
			},
		],
		importName: 'EmailProvider',
		path: 'email',
		options: {
			Generator: false,
			server: {
				name: 'EMAIL_SERVER',
				value: 'smtp://username:password@smtp.example.com:587',
			},
			from: { name: 'EMAIL_FROM', value: 'noreply@example.com' },
		},
	},
	Eveonline: {
		name: 'Eveonline',
		importOptions: [
			{
				defaultImport: true,
				name: 'EVEOnlineProvider',
				path: 'next-auth/providers/eveonline',
			},
		],
		importName: 'EVEOnlineProvider',
		path: 'eveonline',
		options: {
			Generator: false,
			clientId: 'EVEONLINE_ID',
			clientSecret: 'EVEONLINE_SECRET',
		},
	},
	Facebook: {
		name: 'Facebook',
		importOptions: [
			{
				defaultImport: true,
				name: 'FacebookProvider',
				path: 'next-auth/providers/facebook',
			},
		],
		importName: 'FacebookProvider',
		path: 'facebook',
		options: {
			Generator: false,
			clientId: 'FACEBOOK_ID',
			clientSecret: 'FACEBOOK_SECRET',
		},
	},
	Faceit: {
		name: 'Faceit',
		importOptions: [
			{
				defaultImport: true,
				name: 'FaceItProvider',
				path: 'next-auth/providers/faceit',
			},
		],
		importName: 'FaceItProvider',
		path: 'faceit',
		options: {
			Generator: false,
			clientId: 'FACEIT_ID',
			clientSecret: 'FACEIT_SECRET',
		},
	},
	FortyTwoSchool: {
		name: 'FortyTwoSchool',
		importOptions: [
			{
				defaultImport: true,
				name: 'FortyTwoProvider',
				path: 'next-auth/providers/42-school',
			},
		],
		importName: 'FortyTwoProvider',
		path: '42-school',
		options: {
			Generator: false,
			clientId: 'FORTYTWOSCHOOL_ID',
			clientSecret: 'FORTYTWOSCHOOL_SECRET',
		},
	},
	Foursquare: {
		name: 'Foursquare',
		importOptions: [
			{
				defaultImport: true,
				name: 'FourSquareProvider',
				path: 'next-auth/providers/foursquare',
			},
		],
		importName: 'FourSquareProvider',
		path: 'foursquare',
		options: {
			Generator: false,
			clientId: 'FOURSQUARE_ID',
			clientSecret: 'FOURSQUARE_SECRET',
		},
	},
	Freshbooks: {
		name: 'Freshbooks',
		importOptions: [
			{
				defaultImport: true,
				name: 'FreshbooksProvider',
				path: 'next-auth/providers/freshbooks',
			},
		],
		importName: 'FreshbooksProvider',
		path: 'freshbooks',
		options: {
			Generator: false,
			clientId: 'FRESHBOOKS_ID',
			clientSecret: 'FRESHBOOKS_SECRET',
		},
	},
	Fusionauth: {
		name: 'Fusionauth',
		importOptions: [
			{
				defaultImport: true,
				name: 'FusionAuthProvider',
				path: 'next-auth/providers/fusionauth',
			},
		],
		importName: 'FusionAuthProvider',
		path: 'fusionauth',
		options: {
			Generator: false,
			clientId: 'FUSIONID',
			clientSecret: 'FUSIONSECRET',
		},
	},
	GitHub: {
		name: 'GitHub',
		importOptions: [
			{
				defaultImport: true,
				name: 'GitHubProvider',
				path: 'next-auth/providers/github',
			},
		],
		importName: 'GitHubProvider',
		path: 'github',
		options: {
			Generator: false,
			clientId: 'GITHUB_ID',
			clientSecret: 'GITHUB_SECRET',
		},
	},
	Gitlab: {
		name: 'Gitlab',
		importOptions: [
			{
				defaultImport: true,
				name: 'GitlabProvider',
				path: 'next-auth/providers/gitlab',
			},
		],
		importName: 'GitlabProvider',
		path: 'gitlab',
		options: {
			Generator: false,
			clientId: 'GITLAB_ID',
			clientSecret: 'GITLAB_SECRET',
		},
	},
	Google: {
		name: 'Google',
		importOptions: [
			{
				defaultImport: true,
				name: 'GoogleProvider',
				path: 'next-auth/providers/google',
			},
		],
		importName: 'GoogleProvider',
		path: 'google',
		options: {
			Generator: false,
			clientId: 'GOOGLE_ID',
			clientSecret: 'GOOGLE_SECRET',
		},
	},
	Hubspot: {
		name: 'Hubspot',
		importOptions: [
			{
				defaultImport: true,
				name: 'HubspotProvider',
				path: 'next-auth/providers/hubspot',
			},
		],
		importName: 'HubspotProvider',
		path: 'hubspot',
		options: {
			Generator: false,
			clientId: 'HUBSPOT_ID',
			clientSecret: 'HUBSPOT_SECRET',
		},
	},
	IdentityServer4: {
		name: 'IdentityServer4',
		importOptions: [
			{
				defaultImport: true,
				name: 'IdentityServer4Provider',
				path: 'next-auth/providers/identity-server4',
			},
		],
		importName: 'IdentityServer4Provider',
		path: 'identity-server4',
		options: {
			Generator: false,
			clientId: 'IDENTITY_SERVER4_ID',
			clientSecret: 'IDENTITY_SERVER4_SECRET',
			issuer: 'IDENTITY_SERVER4_ISSUER',
		},
	},
	Instagram: {
		name: 'Instagram',
		importOptions: [
			{
				defaultImport: true,
				name: 'InstagramProvider',
				path: 'next-auth/providers/instagram',
			},
		],
		importName: 'InstagramProvider',
		path: 'instagram',
		options: {
			Generator: false,
			clientId: 'INSTAGRAM_ID',
			clientSecret: 'INSTAGRAM_SECRET',
		},
	},
	Kakao: {
		name: 'Kakao',
		importOptions: [
			{
				defaultImport: true,
				name: 'KakaoProvider',
				path: 'next-auth/providers/kakao',
			},
		],
		importName: 'KakaoProvider',
		path: 'kakao',
		options: {
			Generator: false,
			clientId: 'KAKAO_ID',
			clientSecret: 'KAKAO_SECRET',
		},
	},
	Keycloak: {
		name: 'Keycloak',
		importOptions: [
			{
				defaultImport: true,
				name: 'KeycloakProvider',
				path: 'next-auth/providers/keycloak',
			},
		],
		importName: 'KeycloakProvider',
		path: 'keycloak',
		options: {
			Generator: false,
			clientId: 'KEYCLOAK_ID',
			clientSecret: 'KEYCLOAK_SECRET',
		},
	},
	Line: {
		name: 'Line',
		importOptions: [
			{
				defaultImport: true,
				name: 'LineProvider',
				path: 'next-auth/providers/line',
			},
		],
		importName: 'LineProvider',
		path: 'line',
		options: {
			Generator: false,
			clientId: 'LINE_ID',
			clientSecret: 'LINE_SECRET',
		},
	},
	LinkedIn: {
		name: 'LinkedIn',
		importOptions: [
			{
				defaultImport: true,
				name: 'LinkedInProvider',
				path: 'next-auth/providers/linkedin',
			},
		],
		importName: 'LinkedInProvider',
		path: 'linkedin',
		options: {
			Generator: false,
			clientId: 'LINKEDIN_ID',
			clientSecret: 'LINKEDIN_SECRET',
		},
	},
	Mailchimp: {
		name: 'Mailchimp',
		importOptions: [
			{
				defaultImport: true,
				name: 'MailchimpProvider',
				path: 'next-auth/providers/mailchimp',
			},
		],
		importName: 'MailchimpProvider',
		path: 'mailchimp',
		options: {
			Generator: false,
			clientId: 'MAILCHIMP_ID',
			clientSecret: 'MAILCHIMP_SECRET',
		},
	},
	Mailru: {
		name: 'Mailru',
		importOptions: [
			{
				defaultImport: true,
				name: 'MailRuProvider',
				path: 'next-auth/providers/mailru',
			},
		],
		importName: 'MailRuProvider',
		path: 'mailru',
		options: {
			Generator: false,
			clientId: 'MAILRU_ID',
			clientSecret: 'MAILRU_SECRET',
		},
	},
	Mastodon: {
		name: 'Mastodon',
		importOptions: [
			{
				defaultImport: true,
				name: 'MastodonProvider',
				path: 'next-auth/providers/mastodon',
			},
		],
		importName: 'MastodonProvider',
		path: 'mastodon',
		options: {
			Generator: false,
			clientId: 'MASTODON_ID',
			clientSecret: 'MASTODON_SECRET',
			issuer: 'MASTODON_ISSUER',
		},
	},
	Mattermost: {
		name: 'Mattermost',
		importOptions: [
			{
				defaultImport: true,
				name: 'MattermostProvider',
				path: 'next-auth/providers/mattermost',
			},
		],
		importName: 'MattermostProvider',
		path: 'mattermost',
		options: {
			Generator: false,
			clientId: 'MATTERMOST_ID',
			clientSecret: 'MATTERMOST_SECRET',
			issuer: 'MATTERMOST_ISSUER',
		},
	},
	Medium: {
		name: 'Medium',
		importOptions: [
			{
				defaultImport: true,
				name: 'MediumProvider',
				path: 'next-auth/providers/medium',
			},
		],
		importName: 'MediumProvider',
		path: 'medium',
		options: {
			Generator: false,
			clientId: 'MEDIUM_ID',
			clientSecret: 'MEDIUM_SECRET',
		},
	},
	Naver: {
		name: 'Naver',
		importOptions: [
			{
				defaultImport: true,
				name: 'NaverProvider',
				path: 'next-auth/providers/naver',
			},
		],
		importName: 'NaverProvider',
		path: 'naver',
		options: {
			Generator: false,
			clientId: 'NAVER_ID',
			clientSecret: 'NAVER_SECRET',
		},
	},
	Notion: {
		name: 'Notion',
		importOptions: [
			{
				defaultImport: true,
				name: 'NotionProvider',
				path: 'next-auth/providers/notion',
			},
		],
		importName: 'NotionProvider',
		path: 'notion',
		options: {
			Generator: false,
			clientId: 'NOTION_ID',
			clientSecret: 'NOTION_SECRET',
			redirectUri: 'NOTION_REDIRECT_URI',
		},
	},
	Netlify: {
		name: 'Netlify',
		importOptions: [
			{
				defaultImport: true,
				name: 'NetlifyProvider',
				path: 'next-auth/providers/netlify',
			},
		],
		importName: 'NetlifyProvider',
		path: 'netlify',
		options: {
			Generator: false,
			clientId: 'NETLIFY_ID',
			clientSecret: 'NETLIFY_SECRET',
		},
	},
	Okta: {
		name: 'Okta',
		importOptions: [
			{
				defaultImport: true,
				name: 'OktaProvider',
				path: 'next-auth/providers/okta',
			},
		],
		importName: 'OktaProvider',
		path: 'okta',
		options: {
			Generator: false,
			clientId: 'OKTA_ID',
			clientSecret: 'OKTA_SECRET',
		},
	},
	Onelogin: {
		name: 'Onelogin',
		importOptions: [
			{
				defaultImport: true,
				name: 'OneLoginProvider',
				path: 'next-auth/providers/onelogin',
			},
		],
		importName: 'OneLoginProvider',
		path: 'onelogin',
		options: {
			Generator: false,
			clientId: 'ONELOGIN_ID',
			clientSecret: 'ONELOGIN_SECRET',
		},
	},
	Osso: {
		name: 'Osso',
		importOptions: [
			{
				defaultImport: true,
				name: 'OssoProvider',
				path: 'next-auth/providers/osso',
			},
		],
		importName: 'OssoProvider',
		path: 'osso',
		options: {
			Generator: false,
			clientId: 'OSSO_ID',
			clientSecret: 'OSSO_SECRET',
			issuer: 'OSSO_ISSUER',
		},
		issuer: 'OSSO_ISSUER',
	},
	Osu: {
		name: 'Osu',
		importOptions: [
			{
				defaultImport: true,
				name: 'OsuProvider',
				path: 'next-auth/providers/osu',
			},
		],
		importName: 'OsuProvider',
		path: 'osu',
		options: {
			Generator: false,
			clientId: 'OSU_ID',
			clientSecret: 'OSU_SECRET',
		},
	},
	Passage: {
		name: 'Passage',
		importOptions: [
			{
				defaultImport: true,
				name: 'PassageProvider',
				path: 'next-auth/providers/passage',
			},
		],
		importName: 'PassageProvider',
		path: 'passage',
		options: {
			Generator: false,
			clientId: 'PASSAGE_ID',
			clientSecret: 'PASSAGE_SECRET',
			issuer: 'PASSAGE_ISSUER',
		},
		issuer: 'PASSAGE_ISSUER',
	},
	Patreon: {
		name: 'Patreon',
		importOptions: [
			{
				defaultImport: true,
				name: 'PatreonProvider',
				path: 'next-auth/providers/patreon',
			},
		],
		importName: 'PatreonProvider',
		path: 'patreon',
		options: {
			Generator: false,
			clientId: 'PATREON_ID',
			clientSecret: 'PATREON_SECRET',
		},
	},
	Pinterest: {
		name: 'Pinterest',
		importOptions: [
			{
				defaultImport: true,
				name: 'PinterestProvider',
				path: 'next-auth/providers/pinterest',
			},
		],
		importName: 'PinterestProvider',
		path: 'pinterest',
		options: {
			Generator: false,
			clientId: 'PINTEREST_ID',
			clientSecret: 'PINTEREST_SECRET',
		},
	},
	Pipedrive: {
		name: 'Pipedrive',
		importOptions: [
			{
				defaultImport: true,
				name: 'PipedriveProvider',
				path: 'next-auth/providers/pipedrive',
			},
		],
		importName: 'PipedriveProvider',
		path: 'pipedrive',
		options: {
			Generator: false,
			clientId: 'PIPEDRIVE_ID',
			clientSecret: 'PIPEDRIVE_SECRET',
		},
	},
	Reddit: {
		name: 'Reddit',
		importOptions: [
			{
				defaultImport: true,
				name: 'RedditProvider',
				path: 'next-auth/providers/reddit',
			},
		],
		importName: 'RedditProvider',
		path: 'reddit',
		options: {
			Generator: false,
			clientId: 'REDDIT_ID',
			clientSecret: 'REDDIT_SECRET',
		},
	},
	Salesforce: {
		name: 'Salesforce',
		importOptions: [
			{
				defaultImport: true,
				name: 'SalesforceProvider',
				path: 'next-auth/providers/salesforce',
			},
		],
		importName: 'SalesforceProvider',
		path: 'salesforce',
		options: {
			Generator: false,
			clientId: 'SALESFORCE_ID',
			clientSecret: 'SALESFORCE_SECRET',
		},
	},
	Slack: {
		name: 'Slack',
		importOptions: [
			{
				defaultImport: true,
				name: 'SlackProvider',
				path: 'next-auth/providers/slack',
			},
		],
		importName: 'SlackProvider',
		path: 'slack',
		options: {
			Generator: false,
			clientId: 'SLACK_ID',
			clientSecret: 'SLACK_SECRET',
		},
	},
	Spotify: {
		name: 'Spotify',
		importOptions: [
			{
				defaultImport: true,
				name: 'SpotifyProvider',
				path: 'next-auth/providers/spotify',
			},
		],
		importName: 'SpotifyProvider',
		path: 'spotify',
		options: {
			Generator: false,
			clientId: 'SPOTIFY_ID',
			clientSecret: 'SPOTIFY_SECRET',
		},
	},
	Strava: {
		name: 'Strava',
		importOptions: [
			{
				defaultImport: true,
				name: 'StravaProvider',
				path: 'next-auth/providers/strava',
			},
		],
		importName: 'StravaProvider',
		path: 'strava',
		options: {
			Generator: false,
			clientId: 'STRAVA_ID',
			clientSecret: 'STRAVA_SECRET',
		},
	},
	Tiktok: {
		name: 'Tiktok',
		importOptions: [
			{
				defaultImport: true,
				name: 'TiktokProvider',
				path: 'next-auth/providers/tiktok',
			},
		],
		importName: 'TiktokProvider',
		path: 'tiktok',
		options: {
			Generator: false,
			clientId: 'TIKTOK_ID',
			clientSecret: 'TIKTOK_SECRET',
		},
	},
	Todoist: {
		name: 'Todoist',
		importOptions: [
			{
				defaultImport: true,
				name: 'TodoistProvider',
				path: 'next-auth/providers/todoist',
			},
		],
		importName: 'TodoistProvider',
		path: 'todoist',
		options: {
			Generator: false,
			clientId: 'TODOIST_ID',
			clientSecret: 'TODOIST_SECRET',
		},
	},
	Trakt: {
		name: 'Trakt',
		importOptions: [
			{
				defaultImport: true,
				name: 'TraktProvider',
				path: 'next-auth/providers/trakt',
			},
		],
		importName: 'TraktProvider',
		path: 'trakt',
		options: {
			Generator: false,
			clientId: 'TRAKT_ID',
			clientSecret: 'TRAKT_SECRET',
		},
	},
	Twitch: {
		name: 'Twitch',
		importOptions: [
			{
				defaultImport: true,
				name: 'TwitchProvider',
				path: 'next-auth/providers/twitch',
			},
		],
		importName: 'TwitchProvider',
		path: 'twitch',
		options: {
			Generator: false,
			clientId: 'TWITCH_ID',
			clientSecret: 'TWITCH_SECRET',
		},
	},
	Twitter: {
		name: 'Twitter',
		importOptions: [
			{
				defaultImport: true,
				name: 'TwitterProvider',
				path: 'next-auth/providers/twitter',
			},
		],
		importName: 'TwitterProvider',
		path: 'twitter',
		options: {
			Generator: false,
			clientId: 'TWITTER_ID',
			clientSecret: 'TWITTER_SECRET',
		},
		version: '2.0',
	},
	UnitedEffects: {
		name: 'UnitedEffects',
		importOptions: [
			{
				defaultImport: true,
				name: 'UnitedEffectsProvider',
				path: 'next-auth/providers/united-effects',
			},
		],
		importName: 'UnitedEffectsProvider',
		path: 'united-effects',
		options: {
			Generator: false,
			clientId: 'UE_ID',
			clientSecret: 'UE_SECRET',
			issuer: 'UE_ISSUER',
		},
	},
	Vk: {
		name: 'Vk',
		importOptions: [
			{
				defaultImport: true,
				name: 'VkProvider',
				path: 'next-auth/providers/vk',
			},
		],
		importName: 'VkProvider',
		path: 'vk',
		options: {
			Generator: false,
			clientId: 'VK_ID',
			clientSecret: 'VK_SECRET',
		},
	},
	Wikimedia: {
		name: 'Wikimedia',
		importOptions: [
			{
				defaultImport: true,
				name: 'WikimediaProvider',
				path: 'next-auth/providers/wikimedia',
			},
		],
		importName: 'WikimediaProvider',
		path: 'wikimedia',
		options: {
			Generator: false,
			clientId: 'WIKIMEDIA_ID',
			clientSecret: 'WIKIMEDIA_SECRET',
		},
	},
	Wordpress: {
		name: 'Wordpress',
		importOptions: [
			{
				defaultImport: true,
				name: 'WordpressProvider',
				path: 'next-auth/providers/wordpress',
			},
		],
		importName: 'WordpressProvider',
		path: 'wordpress',
		options: {
			Generator: false,
			clientId: 'WORDPRESS_ID',
			clientSecret: 'WORDPRESS_SECRET',
		},
	},
	WorkOS: {
		name: 'WorkOS',
		importOptions: [
			{
				defaultImport: true,
				name: 'WorkOSProvider',
				path: 'next-auth/providers/workos',
			},
		],
		importName: 'WorkOSProvider',
		path: 'workos',
		options: {
			Generator: false,
			clientId: 'WORKOS_ID',
			clientSecret: 'WORKOS_SECRET',
		},
	},
	Yandex: {
		name: 'Yandex',
		importOptions: [
			{
				defaultImport: true,
				name: 'YandexProvider',
				path: 'next-auth/providers/yandex',
			},
		],
		importName: 'YandexProvider',
		path: 'yandex',
		options: {
			Generator: false,
			clientId: 'YANDEX_ID',
			clientSecret: 'YANDEX_SECRET',
		},
	},
	Zitadel: {
		name: 'Zitadel',
		importOptions: [
			{
				defaultImport: true,
				name: 'ZitadelProvider',
				path: 'next-auth/providers/zitadel',
			},
		],
		importName: 'ZitadelProvider',
		path: 'zitadel',
		options: {
			Generator: false,
			clientId: 'ZITADEL_ID',
			clientSecret: 'ZITADEL_SECRET',
		},
	},
	Zoho: {
		name: 'Zoho',
		importOptions: [
			{
				defaultImport: true,
				name: 'ZohoProvider',
				path: 'next-auth/providers/zoho',
			},
		],
		importName: 'ZohoProvider',
		path: 'zoho',
		options: {
			Generator: false,
			clientId: 'ZOHO_ID',
			clientSecret: 'ZOHO_SECRET',
		},
	},
	Zoom: {
		name: 'Zoom',
		importOptions: [
			{
				defaultImport: true,
				name: 'ZoomProvider',
				path: 'next-auth/providers/zoom',
			},
		],
		importName: 'ZoomProvider',
		path: 'zoom',
		options: {
			Generator: false,
			clientId: 'ZOOM_ID',
			clientSecret: 'ZOOM_SECRET',
		},
	},
};

export const ProviderKeys = (key: keyof typeof providers) => {
	return providers[key];
};

export const providerChoices = Object.entries(providers).map(
	([key, value], _) => {
		const { name: title, importName: description } = value;
		return {
			title: title,
			description: description,
			value: key,
			disabled: false,
		};
	},
);
