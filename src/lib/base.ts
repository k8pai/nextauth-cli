import fs from 'fs';
import { initCommandOptions } from '../typings';
import { OptionsType, ProviderKeys, ProviderType } from './Providers';

export const getProviders = (options: Omit<initCommandOptions, 'ts'>) => {
	let providers = '',
		envVariables = '';
	const { env } = options;

	for (const [key, value] of Object.entries(options)) {
		if (key !== 'env' && value) {
			const { name, id, secret } = ProviderKeys(
				key as keyof ProviderType,
			);
			providers += `${name}({
			clientId: process.env.${id},
			clientSecret: process.env.${secret},
		}),\n\t\t`;

			envVariables += `# Environmental variables for ${name}\n${id}=\n${secret}=\n\n`;
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

	for (const [key, value] of Object.entries(options)) {
		if (key !== 'env' && value) {
			imports += `import ${capitalize(
				key,
			)}Provider from 'next-auth/providers/${key.toLowerCase()}';\n`;
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
