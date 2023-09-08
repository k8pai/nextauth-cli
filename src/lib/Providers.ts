export const providers = {
	google: {
		name: 'GoogleProvider',
		id: 'GOOGLE_CLIENT_ID',
		secret: 'GOOGLE_CLIENT_SECRET',
	},
	github: {
		name: 'GithubProvider',
		id: 'GITHUB_ID',
		secret: 'GITHUB_SECRET',
	},
};

export type ProviderType = typeof providers;
export type OptionsType = {
	[key in keyof ProviderType]?: boolean;
};
export const ProviderKeys = (key: keyof OptionsType) => {
	return providers[key];
};
