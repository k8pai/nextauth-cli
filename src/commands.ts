import commander, { Command } from 'commander';
import { OptionsType, providers } from './lib/Providers.js';
import { NextGenerator } from './Nextjs/index.js';
const program = new Command();

// `init` command instance!
const init = program
	.command('init')
	.description(
		'Initialize the basic steps of creating the files and setting up code.',
	);

// `next-app` command instance!
const nextapp = init.command('next-app');

// nextjs /app route initialization!
nextapp
	.option('--env', 'update .env file with provider variables as well!')
	.option(
		'--ts',
		'Provide if you have a typescript project setup or not. Default js files are created...',
	)
	.action((options: OptionsType & { ts: boolean; env: boolean }) => {
		NextGenerator(options, 'app', 'api/auth/[...nextauth]', 'route');
	});

// `next-pages` command instance!
const nextpages = init.command('next-pages');

// nextjs /pages route initialization!
nextpages
	.option('--env', 'update .env file with provider variables as well!')
	.option(
		'--ts',
		'Provide if you have a typescript project setup or not. Default js files are created...',
	)
	.action((options: OptionsType & { ts: boolean; env: boolean }) => {
		// NextpagesGenerator(options);
		NextGenerator(options, 'pages', 'api/auth', '[...nextauth]');
	});

// Adding options for both `next-app` and `next-pages` command!
for (let key in providers) {
	nextapp.option(`--${key}`, `Add ${key} Provider.`);
	nextpages.option(`--${key}`, `Add ${key} Provider.`);
}

export default program;
