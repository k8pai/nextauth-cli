import fs from 'fs';
import path from 'path';
import { Adapters } from './Adapters';
import { bold } from 'picocolors';
import { createSpinner } from 'nanospinner';
import { ProviderKeys, providers } from './Providers';
import { GenerateNeo4jAdapter } from './Generators/neo4j';
import { GenerateFaunaAdapter } from './Generators/fauna';
import { GeneratePrismaAdapter } from './Generators/prisma';
import { GenerateKyselyAdapter } from './Generators/kysely';
import { GenerateDgraphAdapter } from './Generators/dgraph';
import { GenerateMongodbAdapter } from './Generators/mongodb';
import { GenerateDrizzleAdapter } from './Generators/drizzle';
import { GenerateSupabaseAdapter } from './Generators/supabase';
import { GenerateDynamodbAdapter } from './Generators/dynamodb';
import { GenerateFirebaseAdapter } from './Generators/firebase';
import { GenerateMikroOrmAdapter } from './Generators/mikroOrm';
import { GenerateSequelizeAdapter } from './Generators/sequelize';
import { GenerateUpstashRedisAdapter } from './Generators/upstashRedis';
import {
	DbTypes,
	ProviderType,
	OptionsType,
	AdapterType,
	ExtentionTypes,
	FlagOptions,
	ProviderOptions,
} from '../typings';

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

const getAuthOptions = (
	options: OptionsType,
	ts?: boolean,
	adapter?: AdapterType,
) => {
	// Generating providers...
	let data = '',
		response: { providerOptions: string; adapterOptions: string } = {
			providerOptions: '',
			adapterOptions: '',
		};
	const { env, ...config } = options;

	for (const [key, value] of Object.entries(config)) {
		if (!value) {
			continue;
		}
		let params = '';
		const { importName, options: contents } =
			providers[key as ProviderOptions];

		for (const [key, value] of Object.entries(contents)) {
			if (typeof value === 'string') {
				params += `\n\t\t\t${key}: process.env.${value}${
					ts ? ' as string' : ''
				},`;
				continue;
			}
			const { name, type } = value;
			params += `\n\t\t\t${key}: process.env.${name}${
				ts ? ` as ${type}` : ''
			},`;
		}
		data += `\n\t\t${importName}({${params}\n\t\t}),`;
	}
	response.providerOptions = data;

	// Generating Adapters if any...
	if (adapter && Adapters[adapter]) {
		const { adapterParams: params, importName: option } = Adapters[adapter];
		response.adapterOptions = `\n\tadapter: ${adapter}(${params})`;
	}

	return response;
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

export const GenerateTemplate = (
	options: Omit<OptionsType, 'ts'>,
	ts?: boolean,
	adapter?: AdapterType,
	router?: 'app' | 'pages',
) => {
	const { comment, export: exportStatement } = getTsAdditions(ts);
	const { allImports } = getImports(options, ts, adapter);
	const { adapterOptions, providerOptions } = getAuthOptions(
		options,
		ts,
		adapter,
	);

	return `${allImports}
export const authOptions${ts ? ': NextAuthOptions' : ''} = {
	// Configure one or more authentication providers${comment}
	providers: [${providerOptions}
		// ...add more providers here
	],${adapterOptions ?? ''}
};

${exportStatement}`;
};

// // const getAdapterImport = (adapter: AdapterType) => {};

// const getAdapters = (customAdapter: AdapterType) => {
// 	// console.log('getAdapters call...');
// 	const { adapterParams: params, importName: adapter } =
// 		Adapters[customAdapter];

// 	return `\n\tadapter: ${adapter}(${params})`;
// };

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

export const GenerateEnvVariables = async (options: OptionsType) => {
	const { provider, env, ts, adapter, router, db, ...config } = options;

	if (!env) {
		return;
	}
	let data = '';
	for (const [key, value] of Object.entries(config)) {
		// params = '';
		if (!value) {
			continue;
		}

		const { name, options } = providers[key as ProviderOptions];
		data += `# Environmental variables for ${name} Provider.\n`;

		for (let [key, value] of Object.entries(options)) {
			if (typeof value === 'string') {
				data += `${value}=\n`;
				continue;
			}
			data += `${value.name}=\n`;
		}
		data += `\n`;
	}

	if (adapter && Adapters[adapter] && Adapters[adapter].secrets) {
		let secrets = Adapters[adapter]?.secrets;
		if (secrets.length > 0) {
			data += `# Environmental variables for ${adapter} Adapter.\n`;
		}
		for (let secret of secrets) {
			data += `${secret}=\n`;
		}
	}

	const envGenerator = createSpinner('Generating .env.example file...', {
		color: 'cyan',
	}).start();
	const styledEnv = bold('.env.example');

	fs.access('.env.example', fs.constants.F_OK, (err) => {
		fs.writeFile('.env.example', data, (err) => {
			if (err) {
				envGenerator.error({
					text: `Failed to Update ${styledEnv} file.`,
				});
			}
		});
	});
	await sleep(400);
	envGenerator.success({
		text: `${styledEnv} Generated.`,
	});
};

export const GenerateAdapterConfigurations = async (
	ext: ExtentionTypes = '.js',
	db?: DbTypes,
	adapter?: AdapterType,
) => {
	if (!adapter || !Adapters[adapter]) {
		return;
	}

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
