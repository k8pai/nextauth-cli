import fs from 'fs';
import { red, bold } from 'picocolors';
import { createSpinner } from 'nanospinner';
import { Adapters } from './Adapters';
import { GeneratePrismaAdapter } from './Generators/prisma';
import { GenerateMongodbAdapter } from './Generators/mongodb';
import { ProviderKeys, providers } from './Providers';
import { GenerateDrizzleAdapter } from './Generators/drizzle';
import {
	DbTypes,
	ProviderType,
	OptionsType,
	AdapterType,
	ExtentionTypes,
	FlagOptions,
	ProviderOptions,
} from '../typings';
import { GenerateDynamodbAdapter } from './Generators/dynamodb';
import { GenerateFaunaAdapter } from './Generators/fauna';
import path from 'path';
import { GenerateFirebaseAdapter } from './Generators/firebase';
import { GenerateKyselyAdapter } from './Generators/kysely';
import { GenerateMikroOrmAdapter } from './Generators/mikroOrm';
import { GenerateNeo4jAdapter } from './Generators/neo4j';
import { GenerateUpstashRedisAdapter } from './Generators/upstashRedis';
import { GenerateSupabaseAdapter } from './Generators/supabase';
import { GenerateSequelizeAdapter } from './Generators/sequelize';
import { GenerateDgraphAdapter } from './Generators/dgraph';

const getImports = (
	options: OptionsType,
	ts?: boolean,
	adapter?: AdapterType,
) => {
	let adapterImports = '',
		providerImports = `import NextAuth from 'next-auth';\n`;

	// logic for provider imports...
	providerImports += ts
		? `import type { NextAuthOptions } from "next-auth";\n`
		: '';

	const { env, ...config } = options;
	for (let val in config) {
		const { importOptions } = providers[val as ProviderOptions];
		for (let { defaultImport, name, path } of importOptions) {
			providerImports += `import ${
				defaultImport ? `${name}` : `{ ${name} }`
			} from '${path}';\n`;
		}
	}

	// logic for adapter imports if any adapters are present...
	if (adapter && Adapters[adapter]) {
		let { importOptions } = Adapters[adapter];
		for (let { defaultImport, name, path } of importOptions) {
			adapterImports += `import ${
				defaultImport ? `${name}` : `{ ${name} }`
			} from '${path}';\n`;
		}
	}
	return {
		allImports: `${providerImports}${adapterImports}`,
	};
};

export const getProviders = async (
	options: Omit<OptionsType, 'ts'>,
	ts?: boolean,
	adapter?: AdapterType,
) => {
	let params = '';
	let providers = '',
		envVariables = '';
	const { env, ...config } = options;

	for (const [key, value] of Object.entries(config)) {
		params = '';
		if (key !== 'env' && value) {
			const { importName, name, options } = ProviderKeys(
				key as keyof ProviderType,
			);
			envVariables += `# Environmental variables for ${name} Provider.\n`;
			params += '\n';
			Object.entries(options).forEach(([key, value], _) => {
				params += `\t\t\t${key}: process.env.${value}${
					ts ? ' as string' : ''
				},\n`;
				envVariables += `${value}=\n`;
			});

			params += '\t\t';
			envVariables += `\n`;
			providers += `\n\t\t${importName}({${params}}),`;
		}
	}

	if (adapter && Adapters[adapter] && Adapters[adapter].secrets) {
		let secrets = Adapters[adapter]?.secrets;
		if (secrets.length > 0) {
			envVariables += `# Environmental variables for ${adapter} Adapter.\n`;
		}
		for (let secret of secrets) {
			envVariables += `${secret}=\n`;
		}
	}

	if (env) {
		const nextGenerator = createSpinner('Generating .env.example file...', {
			color: 'cyan',
		}).start();
		const styledEnv = bold('.env.example');

		fs.access('.env.example', fs.constants.F_OK, (err) => {
			fs.writeFile('.env.example', envVariables, (err) => {
				if (err) {
					nextGenerator.error({
						text: `Failed to Update ${styledEnv} file.`,
					});
				}
			});
		});
		await sleep(400);
		nextGenerator.success({
			text: `${styledEnv} Generated.`,
		});
	}
	return providers;
};

export const generateBaseInitialTemplate = (
	options: Omit<OptionsType, 'ts'>,
	ts?: boolean,
	adapter?: AdapterType,
	router?: 'app' | 'pages',
) => {
	// console.log('generateBaseInitialTemplate call...');
	const { comment, export: exp } = getTsAdditions(ts);
	const { allImports } = getImports(options, ts, adapter);

	return `${allImports}
export const authOptions${ts ? ': NextAuthOptions' : ''} = {
	// Configure one or more authentication providers${comment}
	providers: [${getProviders(options, ts, adapter)}
		// ...add more providers here
	],${adapter && Adapters[adapter] ? getAdapters(adapter) : ''}
};

${exp}`;
};

// const getAdapterImport = (adapter: AdapterType) => {};

const getAdapters = (customAdapter: AdapterType) => {
	// console.log('getAdapters call...');
	const { adapterParams: params, importName: adapter } =
		Adapters[customAdapter];

	return `\n\tadapter: ${adapter}(${params})`;
};

export function hasValidProviders(obj: OptionsType, keys: FlagOptions[]) {
	for (let key in obj) {
		// console.log(`Processing key => ${key}`);
		if (obj.hasOwnProperty(key) && !keys.includes(key as FlagOptions)) {
			// console.log(`Key ${key} is not included in the 'keys' array.`);
			return true;
		}
	}
	return false;
}

const getTsAdditions = (ts?: boolean) => {
	if (ts) {
		return {
			comment: `\n\t// You can modify typesafety of env variables as you like with '!' or using 'as'`,
			export: `const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };`,
		};
	}
	return { comment: '', export: 'export default NextAuth(authOptions);' };
};

export const GenerateAdapterConfigurations = async (
	ext: ExtentionTypes = '.js',
	db?: DbTypes,
	adapter?: AdapterType,
) => {
	switch (adapter) {
		case 'dgraph':
			GenerateDgraphAdapter(ext);
			break;
		case 'drizzle':
			GenerateDrizzleAdapter(db);
			break;
		case 'dynamodb':
			GenerateDynamodbAdapter(ext);
			break;
		case 'fauna':
			GenerateFaunaAdapter(ext);
			break;
		case 'firebase':
			GenerateFirebaseAdapter(ext);
			break;
		case 'kysely':
			GenerateKyselyAdapter(ext);
			break;
		case 'mikroOrm':
			GenerateMikroOrmAdapter(ext);
			break;
		case 'mongodb':
			GenerateMongodbAdapter(ext);
			break;
		case 'neo4j':
			GenerateNeo4jAdapter(ext);
			break;
		case 'pouchdb':
			// GenerateKyselyAdapter(ext);
			break;
		case 'prisma':
			GeneratePrismaAdapter(ext, db);
			break;
		case 'sequalize':
			GenerateSequelizeAdapter(ext);
			break;
		case 'supabase':
			GenerateSupabaseAdapter(ext);
			break;
		case 'upstashRedis':
			GenerateUpstashRedisAdapter(ext);
			break;
	}
};

export const CreateFolderAndWrite = (
	folder: string,
	file: string,
	content: string,
) => {
	const lib = path.join(process.cwd(), folder);
	const fileName = path.join(lib, file);

	if (!fs.existsSync(lib)) {
		fs.mkdirSync(lib, { recursive: true });
	}

	fs.writeFileSync(fileName, content, 'utf-8');
};

export const sleep = (ms: number = 2000) =>
	new Promise((R) => setTimeout(R, ms));
