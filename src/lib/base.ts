import fs from 'fs';
import { initCommandOptions } from '../typings';
import { OptionsType, ProviderKeys, ProviderType } from './Providers';

export const getProviders = (options: OptionsType) => {
	let providers = '',
		envVariables = '';
	const { ts, env, ...config } = options;

	for (const [key, value] of Object.entries(config)) {
		if (key !== 'env' && value) {
			const { importName, name, id, secret } = ProviderKeys(
				key as keyof ProviderType,
			);
			providers += `${importName}({
			clientId: process.env.${id},
			clientSecret: process.env.${secret},
		}),\n\t\t`;

			envVariables += `\n# Environmental variables for ${name} Provider.\n${id}=\n${secret}=\n`;
		}
	}

	if (env) {
		fs.access('.env.example', fs.constants.F_OK, (err) => {
			// if (!err) {
			// 	// File exists, append "happy coding" at the end
			// 	fs.appendFile('.env.example', '\n' + 'hey there...', (err) => {
			// 		if (err) throw err;
			// 		console.log('Updated .env file');
			// 	});
			// } else {
			// File does not exist, create and append data
			fs.writeFile('.env.example', envVariables, (err) => {
				if (err) throw err;
				console.log(
					'Updated .env.example file with the variables to be used!',
				);
			});
			// }
		});
	}
	return providers;
};

export const getProviderImports = (options: OptionsType) => {
	let imports = '';

	const { ts, ...config } = options;

	for (const [key, value] of Object.entries(config)) {
		if (key !== 'env' && value) {
			const { importName, path } = ProviderKeys(
				key as keyof ProviderType,
			);
			imports += `import ${importName} from 'next-auth/providers/${path}';\n`;
		}
	}

	return imports;
};

const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateBaseInitialTemplate = (options: OptionsType) => {
	return `import NextAuth from 'next-auth';
${getProviderImports(options)}
	
export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		${getProviders(options)}
		// ...add more providers here
	],
};

export default NextAuth(authOptions);`;
};
