import fs from 'fs';
import path from 'path';
import { Adapters } from './Adapters';
import { bold } from 'picocolors';
import { createSpinner } from 'nanospinner';
import { ProviderKeys, providers } from './Providers';
import {
	DbTypes,
	ProviderType,
	OptionsType,
	AdapterType,
	ExtentionTypes,
	FlagOptions,
	ProviderOptions,
	SveltekitOptionsType,
} from '../typings';
import {
	GenerateDgraphConfig,
	GenerateDrizzleSchema,
	GenerateDynamodbConfig,
	GenerateFaunaConfig,
	GenerateFirebaseConfig,
	GenerateKyselyConfig,
	GenerateMikroOrmConfig,
	GenerateMongodbClient,
	GenerateNeo4jConfig,
	GeneratePrismaConfig,
	GeneratePrismaSchema,
	GenerateSequelizeConfig,
	GenerateSupabaseConfig,
	GenerateUpstashRedisConfig,
} from '../templates';

export const onPromptState = (state: any) => {
	if (state.aborted) {
		// If we don't re-enable the terminal cursor before exiting
		// the program, the cursor will remain hidden
		process.stdout.write('\x1B[?25h');
		process.stdout.write('\n');
		process.exit(1);
	}
};

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
	secret?: boolean,
) => {
	// Generating providers...
	let data = '',
		response: {
			providerOptions: string;
			adapterOptions: string;
			secretOptions: string;
		} = {
			providerOptions: '',
			adapterOptions: '',
			secretOptions: '',
		};
	const { env, ...config } = options;

	for (const [key, value] of Object.entries(config)) {
		if (!value) {
			continue;
		}
		let params = '';
		const { importName, options: contents } =
			providers[key as ProviderOptions];

		const { Generator } = contents;
		// console.log('Generator => ', contents);
		if (Generator && typeof Generator !== 'boolean') {
			params += Generator();
		} else {
			for (const [key, value] of Object.entries(contents)) {
				if (key === 'Generator') {
					continue;
				}
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
		}

		data += `\n\t\t${importName}({${params}\n\t\t}),`;
	}
	response.providerOptions = data;

	// Generating Adapters if any...
	if (adapter && Adapters[adapter]) {
		const { adapterParams: params, importName } = Adapters[adapter];
		response.adapterOptions = `\n\tadapter: ${importName}(${params}),`;
	}

	// Generating Secret fields if any...
	if (secret) {
		response.secretOptions = `\n\tsecret: process.env.NEXTAUTH_SECRET,`;
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
	secret?: boolean,
) => {
	const { comment, export: exportStatement } = getTsAdditions(ts);
	const { allImports } = getImports(options, ts, adapter);
	const { adapterOptions, providerOptions, secretOptions } = getAuthOptions(
		options,
		ts,
		adapter,
		secret,
	);

	return `${allImports}
export const authOptions${ts ? ': NextAuthOptions' : ''} = {
	// Configure one or more authentication providers${comment}
	providers: [${providerOptions}
		// ...add more providers here
	],${adapterOptions ?? ''}${secretOptions ?? ''}
};

${exportStatement}`;
};

export function hasValidProviders(
	obj: OptionsType | SveltekitOptionsType,
	keys: FlagOptions[],
) {
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
	const { provider, env, ts, adapter, router, db, secret, ...config } =
		options;

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
			if (key === 'Generator') {
				continue;
			}
			if (typeof value === 'string') {
				data += `${value}=\n`;
				continue;
			}
			data += `${value.name}=${value.value ?? ''}\n`;
		}
		data += '\n';
	}

	if (adapter && Adapters[adapter] && Adapters[adapter].secrets) {
		let secrets = Adapters[adapter]?.secrets;
		if (secrets.length > 0) {
			data += `# Environmental variables for ${adapter} Adapter.\n`;
		}
		for (let secret of secrets) {
			data += `${secret}=\n`;
		}
		data += '\n';
	}

	if (secret) {
		data += `NEXTAUTH_SECRET=\n`;
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
	dir?: 'src',
) => {
	if (!adapter || !Adapters[adapter]) {
		return;
	}

	switch (adapter) {
		case 'dgraph':
			CreateFolderAndWrite(
				'lib',
				`config${ext}`,
				GenerateDgraphConfig(),
				dir,
			);
			break;
		case 'drizzle':
			CreateFolderAndWrite(
				'lib',
				'schema.ts',
				GenerateDrizzleSchema(db),
				dir,
			);
			break;
		case 'dynamodb':
			CreateFolderAndWrite(
				'lib',
				`dynamodb${ext}`,
				GenerateDynamodbConfig(ext),
				dir,
			);
			break;
		case 'fauna':
			CreateFolderAndWrite(
				'lib',
				`fauna${ext}`,
				GenerateFaunaConfig(),
				dir,
			);
			break;
		case 'firebase':
			CreateFolderAndWrite(
				'lib',
				`firestore${ext}`,
				GenerateFirebaseConfig(),
				dir,
			);
			break;
		case 'kysely':
			CreateFolderAndWrite('lib', `db.ts`, GenerateKyselyConfig(), dir);
			break;
		case 'mikroOrm':
			CreateFolderAndWrite(
				'lib',
				`config.ts`,
				GenerateMikroOrmConfig(),
				dir,
			);
			break;
		case 'mongodb':
			CreateFolderAndWrite(
				'lib',
				`mongodb${ext}`,
				GenerateMongodbClient(ext),
				dir,
			);
			break;
		case 'neo4j':
			CreateFolderAndWrite(
				'lib',
				`config${ext}`,
				GenerateNeo4jConfig(),
				dir,
			);
			break;
		case 'pouchdb':
			// GenerateKyselyAdapter(ext);
			break;
		case 'prisma':
			CreateFolderAndWrite(
				'lib',
				`prisma${ext}`,
				GeneratePrismaConfig(),
				dir,
			);
			CreateFolderAndWrite(
				'prisma',
				`schema.prisma`,
				GeneratePrismaSchema(db),
			);
			break;
		case 'sequalize':
			CreateFolderAndWrite(
				'lib',
				`config${ext}`,
				GenerateSequelizeConfig(),
				dir,
			);
			break;
		case 'supabase':
			CreateFolderAndWrite(
				'lib',
				`config${ext}`,
				GenerateSupabaseConfig(),
				dir,
			);
			break;
		case 'upstashRedis':
			CreateFolderAndWrite(
				'lib',
				`redis${ext}`,
				GenerateUpstashRedisConfig(),
				dir,
			);
			break;
	}
};

export const CreateFolderAndWrite = (
	folder: string,
	file: string,
	content: string,
	dir?: 'src',
) => {
	const lib = path.join(
		dir ? path.join(process.cwd(), dir) : process.cwd(),
		folder,
	);
	const fileName = path.join(lib, file);

	if (!fs.existsSync(lib)) {
		fs.mkdirSync(lib, { recursive: true });
	}

	fs.writeFileSync(fileName, content, 'utf-8');
};

export const CreateFileAndWrite = (
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

// sveltekit helpers
export const GenerateSveltekitTemplate = (
	rest: ProviderType,
	adapter?: AdapterType,
	env?: boolean,
	ts?: boolean,
	secret?: boolean,
	db?: DbTypes,
	dynamic?: boolean,
) => {
	// return sveltekit template
	// check if we want to generate base template or platform based template.
	const { allImports } = GenerateSveltekitImports(
		rest,
		adapter,
		secret,
		dynamic,
	);
	const { providerOptions, secretOptions, adapterOptions } =
		GenerateSveltekitAuthOptions(rest, adapter, ts, secret, dynamic);

	if (!dynamic) {
		return `${allImports}
export const handle = SvelteKitAuth({
	providers: [${providerOptions}
	],${adapterOptions}${secretOptions}
});`;
	}
	return `${allImports}
export const handle = SvelteKitAuth(async (event) => {
	const authOptions = {
		providers: [${providerOptions}
		],${adapterOptions}${secretOptions}
	}
	return authOptions
}) satisfies Handle;`;
};

export const GenerateSveltekitAuthOptions = (
	options: ProviderType,
	adapter?: AdapterType,
	ts?: boolean,
	secret?: boolean,
	dynamic?: boolean,
) => {
	let data = ``,
		response: {
			providerOptions: string;
			adapterOptions: string;
			secretOptions: string;
		} = {
			providerOptions: '',
			adapterOptions: '',
			secretOptions: '',
		};
	for (const [key, value] of Object.entries(options)) {
		if (!value) {
			continue;
		}
		let params = '';
		const {
			name,
			options: { Generator, ...contents },
		} = providers[key as ProviderOptions];

		// console.log('Generator => ', contents);
		if (Generator && typeof Generator !== 'boolean') {
			params += Generator();
		} else {
			for (const [key, value] of Object.entries(contents)) {
				if (key === 'Generator') {
					continue;
				}
				if (typeof value === 'string') {
					params += `\n\t\t\t${dynamic ? `\t` : ''}${key}: ${
						dynamic ? 'event.platform.env.' : ''
					}${value}${ts ? ' as string' : ''},`;
					continue;
				}
				const { name, type } = value;
				params += `\n\t\t\t${dynamic ? `\t` : ''}${key}: ${
					dynamic ? 'event.platform.env.' : ''
				}${name}${ts ? ` as ${type}` : ''},`;
			}
		}

		data += `\n\t\t${dynamic ? `\t` : ''}${name}({${params}\n\t\t${
			dynamic ? `\t` : ''
		}}),`;
	}
	response.providerOptions = data;

	// Generating Adapters if any...
	if (adapter && Adapters[adapter]) {
		const { adapterParams: params, importName } = Adapters[adapter];
		response.adapterOptions = `\n\t${
			dynamic ? '\t' : ''
		}adapter: ${importName}(${params}),`;
	}

	// Generating Secret fields if any...
	if (secret || dynamic) {
		response.secretOptions = `\n\t${dynamic ? '\t' : ''}secret: ${
			dynamic ? 'event.platform.env.' : ''
		}AUTH_SECRET,\n\t${dynamic ? '\t' : ''}trustHost: true`;
	}

	return response;
};

export const GenerateSveltekitImports = (
	options: ProviderType,
	adapter?: AdapterType,
	secret?: boolean,
	dynamic?: boolean,
) => {
	let adapterImports = '',
		providerImports = `import { SvelteKitAuth } from "@auth/sveltekit";\n`,
		dynamicImports = `import type { Handle } from "@sveltejs/kit";\n`;

	for (let val in options) {
		const { importOptions } = providers[val as ProviderOptions];
		for (let { defaultImport, authName, authPath } of importOptions) {
			providerImports += `import ${
				defaultImport ? `${authName}` : `{ ${authName} }`
			} from '${authPath}';\n`;
		}
	}

	let temp = ``;
	for (let val in options) {
		const {
			options: { Generator, ...envSecrets },
		} = providers[val as ProviderOptions];

		for (let [key, value] of Object.entries(envSecrets)) {
			if (typeof value === 'string') {
				temp += `${value}-`;
				continue;
			}
			temp += `${value.name}-`;
		}
	}

	if (!dynamic) {
		temp = temp.split('-').join(', ').slice(0, -2);
		if (secret) {
			temp += ', AUTH_SECRET';
		}
		providerImports += `import { ${temp} } from '$env/static/private';\n`;
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

	if (dynamic) {
		return {
			allImports: `${providerImports}${adapterImports}${dynamicImports}`,
		};
	}

	return {
		allImports: `${providerImports}${adapterImports}`,
	};
};

export const GenerateSveltekitEnvVariables = async (
	options: SveltekitOptionsType,
) => {
	//
	const { env, ts, adapter, secret, dynamic, db, ...config } = options;

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
			if (key === 'Generator') {
				continue;
			}
			if (typeof value === 'string') {
				data += `${value}=\n`;
				continue;
			}
			data += `${value.name}=${value.value ?? ''}\n`;
		}
		data += '\n';
	}

	if (adapter && Adapters[adapter] && Adapters[adapter].secrets) {
		let secrets = Adapters[adapter]?.secrets;
		if (secrets.length > 0) {
			data += `# Environmental variables for ${adapter} Adapter.\n`;
		}
		for (let secret of secrets) {
			data += `${secret}=\n`;
		}
		data += '\n';
	}

	if (dynamic || secret) {
		data += `AUTH_SECRET=\n`;
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

// solid helper functions.
export const GenerateSolidTemplate = (
	rest: ProviderType,
	adapter?: AdapterType,
	env?: boolean,
	ts?: boolean,
	secret?: boolean,
	db?: DbTypes,
) => {
	const { allImports: solidImports } = GenerateSolidImports(
		rest,
		adapter,
		ts,
	);

	const { providerOptions, adapterOptions, secretOptions } =
		GenerateSolidAuthOptions(rest, adapter, ts, secret);

	return `${solidImports}
export const authOpts${ts ? ': SolidAuthConfig' : ''} = {
	providers: [${providerOptions}
	],${adapterOptions}${secretOptions}
	debug: false,
}

export const { GET, POST } = SolidAuth(authOpts)`;
};

export const GenerateSolidImports = (
	options: ProviderType,
	adapter?: AdapterType,
	ts?: boolean,
) => {
	let adapterImports = '',
		providerImports = `import { SolidAuth${
			ts ? ', type SolidAuthConfig' : ''
		} } from "@auth/solid-start";\n`;

	for (let val in options) {
		const { importOptions } = providers[val as ProviderOptions];
		for (let { defaultImport, authName, authPath } of importOptions) {
			providerImports += `import ${
				defaultImport ? `${authName}` : `{ ${authName} }`
			} from '${authPath}';\n`;
		}
	}

	let temp = ``;
	for (let val in options) {
		const {
			options: { Generator, ...envSecrets },
		} = providers[val as ProviderOptions];

		for (let [key, value] of Object.entries(envSecrets)) {
			if (typeof value === 'string') {
				temp += `${value}-`;
				continue;
			}
			temp += `${value.name}-`;
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

export const GenerateSolidAuthOptions = (
	options: ProviderType,
	adapter?: AdapterType,
	ts?: boolean,
	secret?: boolean,
) => {
	let data = ``,
		response: {
			providerOptions: string;
			adapterOptions: string;
			secretOptions: string;
		} = {
			providerOptions: '',
			adapterOptions: '',
			secretOptions: '',
		};
	for (const [key, value] of Object.entries(options)) {
		if (!value) {
			continue;
		}
		let params = '';
		const {
			name,
			options: { Generator, ...contents },
		} = providers[key as ProviderOptions];

		// console.log('Generator => ', contents);
		if (Generator && typeof Generator !== 'boolean') {
			params += Generator();
		} else {
			for (const [key, value] of Object.entries(contents)) {
				if (key === 'Generator') {
					continue;
				}
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
		}

		data += `\n\t\t${name}({${params}\n\t\t}),`;
	}
	response.providerOptions = data;

	// Generating Adapters if any...
	if (adapter && Adapters[adapter]) {
		const { adapterParams: params, importName } = Adapters[adapter];
		response.adapterOptions = `\n\tadapter: ${importName}(${params}),`;
	}

	// Generating Secret fields if any...
	if (secret) {
		response.secretOptions = `\n\tsecret: process.env.AUTH_SECRET,`;
	}

	return response;
};
