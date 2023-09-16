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
	db?: DbTypes;
	ts?: boolean;
	env?: boolean;
	router?: Routers;
	adapter?: AdapterType;
	provider?: ProviderOptions;
};

export type Routers = 'app' | 'pages';

export type FlagOptions =
	| 'db'
	| 'ts'
	| 'env'
	| 'router'
	| 'adapter'
	| 'provider';

export type OptionsType = ProviderType & InitFlags;

// Extentions Types
export type ExtentionTypes = '.js' | '.ts';

// Database Types
export type drizzleDbTypes = 'postgres' | 'mysql' | 'sqlite';
export type prismaDbTypes = 'postgresql' | 'mongodb';

export type DbTypes = drizzleDbTypes & prismaDbTypes;
