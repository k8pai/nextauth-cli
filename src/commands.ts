import { Command } from 'commander';
import { OptionsType, providers } from './lib/Providers.js';
import { hasNonTsEnvKeys } from './lib/helpers.js';
import { NextGenerator } from './lib/generators.js';
const program = new Command();

// `next-app` command instance!
const nextapp = program.command('next-app');

// nextjs /app route initialization!
nextapp
	.option('--env', 'update .env file with provider variables as well!')
	.option(
		'--ts',
		'Provide if you have a typescript project setup or not. Default js files are created...',
	)
	.option(
		'--adapter <adapter>',
		'Keep the value of the `--adapter` flag as your adapter.',
	)
	.option('--db <db>', 'Type of db provided.')
	.action((options: OptionsType) => {
		if (!hasNonTsEnvKeys(options)) {
			options.GitHub = true;
		}
		NextGenerator(options, 'app', 'api/auth/[...nextauth]', 'route');
	});

// `next-pages` command instance!
const nextpages = program.command('next-pages');

// nextjs /pages route initialization!
nextpages
	.option('--env', 'update .env file with provider variables as well!')
	.option(
		'--ts',
		'Provide if you have a typescript project setup or not. Default js files are created...',
	)
	.option(
		'--adapter <adapter>',
		'Keep the value of the `--adapter` flag as your adapter.',
	)
	.option('--db <db>', 'Type of db provided.')
	.action((options: OptionsType & { ts: boolean; env: boolean }) => {
		if (!hasNonTsEnvKeys(options)) {
			options.GitHub = true;
		}
		NextGenerator(options, 'pages', 'api/auth', '[...nextauth]');
	});

// Adding options for both `next-app` and `next-pages` command!
for (let key in providers) {
	nextapp.option(`--${key}`, `Add ${key} Provider.`);
	nextpages.option(`--${key}`, `Add ${key} Provider.`);
}

export default program;
