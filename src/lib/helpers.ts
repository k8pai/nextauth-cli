import fs from 'fs';
import { AdapterType, DBType } from './Adapters';
import { GeneratePrismaAdapter } from './Generators/prisma';
import { OptionsType, ProviderKeys, ProviderType } from './Providers';

export const getProviders = (
	options: Omit<OptionsType, 'ts'>,
	ts?: boolean,
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

	if (adapter) {
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
	providers: [${getProviders(options, ts)}
		// ...add more providers here
	],${adapter ? generateAdapter(adapter) : ''}
};

${exp}`;
};

const generateAdapterImport = (adapter: AdapterType) => {
	switch (adapter) {
		case 'prisma':
			return `import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@lib/prisma";\n`;
	}
};

const generateAdapter = (adapter: AdapterType) => {
	switch (adapter) {
		case 'prisma':
			return '\n\tadapter: PrismaAdapter(prisma),';
	}
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
	adapter?: AdapterType,
	ext?: '.js' | '.ts',
	db?: DBType,
) => {
	switch (adapter) {
		case 'prisma':
			GeneratePrismaAdapter(ext, db);
			break;
	}
};
