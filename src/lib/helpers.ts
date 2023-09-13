import fs from 'fs';
import { Adapters } from './Adapters';
import { GeneratePrismaAdapter } from './Generators/prisma';
import { GenerateMongodbAdapter } from './Generators/mongodb';
import { ProviderKeys } from './Providers';
import { GenerateDrizzleAdapter } from './Generators/drizzle';
import {
	DbTypes,
	ProviderType,
	OptionsType,
	AdapterType,
	ExtentionTypes,
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

export const getProviders = (
	options: Omit<OptionsType, 'ts'>,
	ts?: boolean,
	adapter?: AdapterType,
) => {
	let providers = '',
		envVariables = '';
	const { env, ...config } = options;

	for (const [key, value] of Object.entries(config)) {
		if (key !== 'env' && value) {
			const { importName, name, id, secret } = ProviderKeys(
				key as keyof ProviderType,
			);
			providers += `\n\t\t${importName}({
			clientId: process.env.${id}${ts ? ' as string' : ''},
			clientSecret: process.env.${secret}${ts ? ' as string' : ''},
		}),`;

			envVariables += `# Environmental variables for ${name} Provider.\n${id}=\n${secret}=\n`;
		}
	}

	if (adapter && Adapters[adapter] && Adapters[adapter].secrets) {
		let secrets = Adapters[adapter]?.secrets;
		if (secrets.length > 0) {
			envVariables += `\n# Environmental variables for ${adapter} Adapter.`;
		}
		for (let secret of secrets) {
			envVariables += `\n${secret}=`;
		}
	}

	if (env) {
		fs.access('.env.example', fs.constants.F_OK, (err) => {
			fs.writeFile('.env.example', envVariables, (err) => {
				if (err) throw err;
				console.log(
					'Updated .env.example file with the variables to be used!',
				);
			});
		});
	}
	return providers;
};

export const getProviderImports = (
	options: OptionsType,
	ts?: boolean,
	adapter?: AdapterType,
) => {
	let imports = ts
		? `import type { NextAuthOptions } from "next-auth"\n`
		: '';

	const { ...config } = options;

	for (const [key, value] of Object.entries(config)) {
		if (key !== 'env' && value) {
			const { importName, path } = ProviderKeys(
				key as keyof ProviderType,
			);
			imports += `import ${importName} from 'next-auth/providers/${path}';\n`;
		}
	}

	if (adapter && Adapters[adapter]) {
		imports += generateAdapterImport(adapter);
	}

	return imports;
};

export const generateBaseInitialTemplate = (
	options: Omit<OptionsType, 'ts'>,
	ts?: boolean,
	adapter?: AdapterType,
) => {
	const { comment, export: exp } = getTsAdditions(ts);

	return `import NextAuth from 'next-auth';
${getProviderImports(options, ts, adapter)}
export const authOptions${ts ? ': NextAuthOptions' : ''} = {
	// Configure one or more authentication providers${comment}
	providers: [${getProviders(options, ts, adapter)}
		// ...add more providers here
	],${adapter && Adapters[adapter] ? generateAdapter(adapter) : ''}
};

${exp}`;
};

const generateAdapterImport = (adapter: AdapterType) => {
	let { importName, path } = Adapters[adapter];
	let adapterImports = `import { ${importName} } from "@auth/${path}";`;

	switch (adapter) {
		case 'dgraph':
			return `${adapterImports}\nimport { config } from "@lib/config";\n`;
		case 'drizzle':
			return `${adapterImports}\nimport { db } from "@lib/schema";\n`;
		case 'dynamodb':
			return `${adapterImports}\nimport { client } from "@lib/dynamodb";\n`;
		case 'fauna':
			return `${adapterImports}\nimport { client } from "@lib/fauna";\n`;
		case 'firebase':
			return `${adapterImports}\nimport { firestore } from "@lib/firestore";\n`;
		case 'kysely':
			return `${adapterImports}\nimport { db } from "@lib/db";\n`;
		case 'mikroOrm':
			return `${adapterImports}\nimport { config } from "@lib/config";\n`;
		case 'mongodb':
			return `${adapterImports}\nimport clientPromise from "@lib/mongodb"\n`;
		case 'neo4j':
			return `${adapterImports}\nimport neo4jSession from "@lib/config";\n`;
		case 'pouchdb':
			return;
		case 'prisma':
			return `${adapterImports}\nimport prisma from "@lib/prisma";\n`;
		case 'sequalize':
			return `${adapterImports}\nimport sequelize from "@lib/config";\n`;
		case 'supabase':
			return `${adapterImports}\nimport { config } from "@lib/config";\n`;
		case 'typeorm':
			return `${adapterImports}\n`;
		case 'upstashRedis':
			return `${adapterImports}\nimport redis from "@lib/redis";\n`;
		case 'xata':
			return `${adapterImports}\nimport { XataClient } from "@lib/xata";\n`;
	}
};

const generateAdapter = (customAdapter: AdapterType) => {
	const { adapterParams: params, importName: adapter } =
		Adapters[customAdapter];

	return `\n\tadapter: ${adapter}(${params})`;
};

export function hasNonTsEnvKeys(obj: OptionsType) {
	for (let key in obj) {
		if (
			obj.hasOwnProperty(key) &&
			key !== 'ts' &&
			key !== 'env' &&
			key !== 'adapter' &&
			key !== 'db'
		) {
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

export const GenerateAdapterConfigurations = (
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

// const levenshteinDistance = (a: string, b: string): number => {
// 	const m = a.length;
// 	const n = b.length;
// 	const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

// 	for (let i = 0; i <= m; i++) {
// 		dp[i][0] = i;
// 	}

// 	for (let j = 0; j <= n; j++) {
// 		dp[0][j] = j;
// 	}

// 	for (let i = 1; i <= m; i++) {
// 		for (let j = 1; j <= n; j++) {
// 			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
// 			dp[i][j] = Math.min(
// 				dp[i - 1][j] + 1,
// 				dp[i][j - 1] + 1,
// 				dp[i - 1][j - 1] + cost,
// 			);
// 		}
// 	}

// 	return dp[m][n];
// };

// export const checkSimilarAdapter = (mistypedValue: string): AdapterType => {
// 	const availableAdapters: Array<AdapterType> = [
// 		'dgraph',
// 		'drizzle',
// 		'dynamodb',
// 		'fauna',
// 		'firebase',
// 		'kysely',
// 		'mongodb',
// 		'neo4j',
// 		'pouchdb',
// 		'prisma',
// 		'supabase',
// 		'typeorm',
// 		'xata',
// 		'mikroOrm',
// 		'sequalize',
// 		'upstashRedis',
// 	];

// 	let closestAdapter: AdapterType = availableAdapters[0] ?? 'dgraph';
// 	let minDistance = levenshteinDistance(mistypedValue, availableAdapters[0]);

// 	for (let i = 1; i < availableAdapters.length; i++) {
// 		const distance = levenshteinDistance(
// 			mistypedValue,
// 			availableAdapters[i],
// 		);
// 		if (distance < minDistance) {
// 			minDistance = distance;
// 			closestAdapter = availableAdapters[i];
// 		}
// 	}

// 	return closestAdapter;
// };
