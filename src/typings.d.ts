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
	secret?: boolean;
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
	| 'secret'
	| 'router'
	| 'adapter'
	| 'dynamic'
	| 'provider';

export type OptionsType = ProviderType & InitFlags;

// Extentions Types
export type ExtentionTypes = '.js' | '.ts';

// Database Types
export type drizzleDbTypes = 'postgres' | 'mysql' | 'sqlite';
export type prismaDbTypes = 'postgresql' | 'mongodb';

export type DbTypes = drizzleDbTypes & prismaDbTypes;

// sveltekit specific typings
export type SveltekitOptionsType = ProviderType & {
	ts?: boolean;
	db?: DbTypes;
	env?: boolean;
	secret?: boolean;
	dynamic?: boolean;
	adapter?: AdapterType;
	provider?: ProviderOptions;
};

// solid specific typings
export type SolidOptionsType = ProviderType & {
	ts?: boolean;
	db?: DbTypes;
	env?: boolean;
	secret?: boolean;
	adapter?: AdapterType;
	provider?: ProviderOptions;
};
