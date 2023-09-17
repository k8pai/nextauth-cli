import { Command } from 'commander';
import { cyan, green, magenta, red, yellow, bold, blue } from 'picocolors';
import prompts from 'prompts';
import { providerChoices, providers } from './lib/Providers.js';
import { hasValidProviders, sleep } from './lib/helpers.js';
import { NextGenerator } from './lib/generators.js';
import { OptionsType, ProviderOptions } from './typings.js';
import { adapterChoices } from './lib/Adapters.js';
import { createSpinner } from 'nanospinner';

const program = new Command();

const onPromptState = (state: any) => {
	if (state.aborted) {
		// If we don't re-enable the terminal cursor before exiting
		// the program, the cursor will remain hidden
		process.stdout.write('\x1B[?25h');
		process.stdout.write('\n');
		process.exit(1);
	}
};

program
	.option('-E, --env', 'update .env file with provider variables as well!')
	.option(
		'-T, --ts',
		'Provide if you have a typescript project setup or not. Default js files are created...',
	)
	.option('-R, --router <router>', 'Router type of your next.js application.')
	.option(
		'-P, --provider <provider>',
		'Keep the value of the `--provider` flag as your provider.',
	)
	.option(
		'-A, --adapter <adapter>',
		'Keep the value of the `--adapter` flag as your adapter.',
	)
	.option('-S, --secret', 'Adds the `secret` field in the NextAuth options.')
	.option('-D, --db <db>', 'Type of db provided.')
	.action(async (options: OptionsType) => {
		let provider: ProviderOptions[] = ['GitHub'];
		let { router, env, adapter, ts } = options;

		let providerIsPresent = hasValidProviders(options, [
			'db',
			'ts',
			'env',
			'router',
			'adapter',
			'secret',
		]);

		if (!providerIsPresent) {
			const styledProvider = blue('Providers');
			const { providerType } = await prompts({
				type: 'multiselect',
				name: 'providerType',
				message: `Select The ${styledProvider} you want to include.`,
				instructions: false,
				initial: 1,
				choices: providerChoices,
				hint: `- Space to select. - Return/Enter to submit. 'A' - Select all.`,
			});
			provider = providerType;
		}

		if (!router || (router !== 'pages' && router !== 'app')) {
			const styledHelp = yellow('nextauth --help');
			if (router !== 'pages' && router !== 'app') {
				console.log(
					magenta(
						`Such a route is not yet defined, try ${styledHelp}`,
					),
				);
			}
			const styledApp = blue('/app');
			const styledSrc = yellow('/src');
			const { routerType } = await prompts({
				onState: onPromptState,
				type: 'select',
				name: 'routerType',
				message: `What's your folder structure? (default: ${styledApp})`,
				choices: [
					{
						title: 'App Router',
						description: 'App router that comes with the V13.0+',
						value: 'app',
					},
					{
						title: 'Pages Router',
						description: 'Pages router that ',
						value: 'pages',
					},
					{
						title: 'Src',
						description:
							'Src directory structure, Not yet supported.',
						value: 'src',
						disabled: true,
					},
				],
				warn: `Support for ${styledSrc} is on the way!`,
			});
			router = routerType;
		}

		if (!adapter) {
			const styledAdapter = blue('Adapter');
			const { adapterType } = await prompts({
				onState: onPromptState,
				type: 'toggle',
				name: 'adapterType',
				message: `Do you want to configure an ${styledAdapter}?`,
				initial: 'Yes',
				active: 'Yes',
				inactive: 'No',
			});
			let adapter = Boolean(adapterType);
			options.adapter = undefined;

			if (adapter) {
				const { adapterChoice } = await prompts({
					onState: onPromptState,
					type: 'select',
					name: 'adapterChoice',
					message: `Select your ${styledAdapter}?`,
					choices: adapterChoices,
				});
				options.adapter = adapterChoice;
			}
		}

		if (!ts) {
			const styledTs = blue('Typescript');
			const { tsType } = await prompts({
				onState: onPromptState,
				type: 'toggle',
				name: 'tsType',
				message: `Is your project ${styledTs} configured?`,
				initial: 'Yes',
				active: 'Yes',
				inactive: 'No',
			});
			options.ts = Boolean(tsType);
		}

		if (!env) {
			const styledEnv = blue('.env.example');
			const { envType } = await prompts({
				onState: onPromptState,
				type: 'toggle',
				name: 'envType',
				message: `Would you like to Generate ${styledEnv} file?`,
				initial: 'Yes',
				active: 'Yes',
				inactive: 'No',
			});
			options.env = Boolean(envType);
		}

		for (let val of provider) {
			options[val] = true;
		}

		if (
			!hasValidProviders(options, [
				'db',
				'ts',
				'env',
				'router',
				'secret',
				'adapter',
				'provider',
			])
		) {
			options.GitHub = true;
		}

		if (router === 'app') {
			NextGenerator(options, router!, 'api/auth/[...nextauth]', 'route');
		} else if (router === 'pages') {
			NextGenerator(options, router!, 'api/auth', '[...nextauth]');
		}
	});

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
		if (hasValidProviders(options, ['ts', 'env', 'adapter', 'router'])) {
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
		if (hasValidProviders(options, ['ts', 'env', 'adapter', 'db'])) {
			options.GitHub = true;
		}
		NextGenerator(options, 'pages', 'api/auth', '[...nextauth]');
	});

// Adding options for both `next-app` and `next-pages` command!
for (let key in providers) {
	program.option(`--${key}`, `Add ${key} Provider.`);
	nextapp.option(`--${key}`, `Add ${key} Provider.`);
	nextpages.option(`--${key}`, `Add ${key} Provider.`);
}

export default program;
