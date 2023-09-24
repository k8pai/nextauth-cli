#!/usr/bin/env node

import { Command } from 'commander';
import { SolidGenerator, SveltekitGenerator } from './lib/generators';
import { cyan, green, magenta, red, yellow, bold, blue } from 'picocolors';
import prompts from 'prompts';
import { hasValidProviders, onPromptState } from './lib/helpers';
import { ProviderOptions, SveltekitOptionsType } from './typings';
import { providerChoices, providers } from './lib/Providers';
import { adapterChoices } from './lib/Adapters';

// `sveltekit` command instance!
const solid = new Command();

// sveltekit initialization!
solid
	.option('--env', 'update .env file with provider variables as well!')
	.option(
		'--ts',
		'Provide if you have a typescript project setup or not. Default js files are created...',
	)
	.option(
		'--adapter <adapter>',
		'Keep the value of the `--adapter` flag as your adapter.',
	)
	.option('--secret', 'Adds the `secret` field in the NextAuth options.')
	.option(
		'-P, --provider <provider>',
		'Keep the value of the `--provider` flag as your provider.',
	)
	.option('-D, --db <db>', 'Type of db provided.')
	.action(async (options: Omit<SveltekitOptionsType, 'dynamic'>) => {
		let customProvider: ProviderOptions[] = ['GitHub'];
		let { env, adapter, provider, ts } = options;

		let providerIsPresent = hasValidProviders(options, [
			'db',
			'ts',
			'env',
			'secret',
			'adapter',
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
			customProvider = providerType;

			for (let val of customProvider) {
				options[val] = true;
			}
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

		if (provider) {
			options[provider] = true;
		}

		if (
			!hasValidProviders(options, [
				'db',
				'ts',
				'env',
				'secret',
				'adapter',
				'provider',
			])
		) {
			options.GitHub = true;
		}

		SolidGenerator(options);
	});

for (let key in providers) {
	solid.option(`--${key}`, `Adds the ${key} Provider.`);
}

solid.parse(process.argv);
