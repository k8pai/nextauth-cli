import { Adapters } from './lib/Adapters';
import { providers } from './lib/Providers';

// Adapter Types
export type Adapter = typeof Adapters;

export type AdapterType = keyof typeof Adapters;

// Provider Types
export type Provider = typeof providers;
export type ProviderOptions = keyof typeof providers;
export type ProviderType = {
	[key in keyof typeof providers]?: boolean;
};
export type InitFlags = {
	ts?: boolean;
	env?: boolean;
	adapter?: AdapterType;
	router?: 'app' | 'pages';
	db?: DbTypes;
};

export type FlagOptions = 'ts' | 'env' | 'adapter' | 'router' | 'db';

export type OptionsType = ProviderType & InitFlags;

// Extentions Types
export type ExtentionTypes = '.js' | '.ts';

// Database Types
export type drizzleDbTypes = 'postgres' | 'mysql' | 'sqlite';
export type prismaDbTypes = 'postgresql' | 'mongodb';

export type DbTypes = drizzleDbTypes & prismaDbTypes;
