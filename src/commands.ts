import fs from 'fs';
import path from 'path';
// import ora from 'ora';
// import chalk from 'chalk';
import commander, { Command } from 'commander';
import { generateBaseInitialTemplate } from './lib/base.js';
import { initCommandOptions } from './typings.js';
import { exec, execSync } from 'child_process';
const program = new Command();

program
	.addArgument(
		new commander.Argument(
			'<directory>',
			`Next.js directory structure: 'src' for /src/pages router, 'pages' for /pages router, 'app' for /app router.`,
		).choices(['src', 'pages', 'app']),
	)
	.option('--github', 'Add github Provider.')
	.option('--google', 'Add Google Provider.')
	.option('--env', 'update .env file with provider variables as well!')
	.option(
		'--ts',
		'Provide if you have a typescript project setup or not. Default js files are created...',
	)
	.action(async (dirStructure: string, options: initCommandOptions) => {
		// console.log('options => ', options);
		const { env, ts, ...configs } = options;

		const dir = {
			baseDirectory: '',
			targetDirectory: 'api/auth',
			filePath: '[...nextauth].js',
			ext: '.js',
		};

		if (ts) {
			dir.filePath = '[...nextauth].ts';
			dir.ext = '.ts';
		}

		if (dirStructure.toLowerCase() === 'src') {
			dir.baseDirectory = path.join(process.cwd(), `src/pages`);
		} else if (dirStructure.toLowerCase() === 'app') {
			dir.baseDirectory = path.join(process.cwd(), `app`);
			dir.targetDirectory = path.join(
				dir.baseDirectory,
				'api/auth/[...nextauth]',
			);
			dir.filePath = path.join(dir.targetDirectory, `route${dir.ext}`);
		} else if (dirStructure.toLowerCase() === 'pages') {
			dir.baseDirectory = path.join(process.cwd(), `pages`);
			dir.targetDirectory = path.join(dir.baseDirectory, 'api/auth');
			dir.filePath = path.join(
				dir.targetDirectory,
				`[...nextauth]${dir.ext}`,
			);
		}

		if (!fs.existsSync(dir.baseDirectory)) {
			console.error(
				`Error: The "${dir.baseDirectory}" folder does not exist. Maybe you got your directory structure messed up... try using \n'init --help'`,
			);
			return;
		}

		try {
			if (!fs.existsSync(dir.targetDirectory)) {
				fs.mkdirSync(dir.targetDirectory, { recursive: true });
			}
			fs.writeFileSync(
				dir.filePath,
				generateBaseInitialTemplate(options),
				'utf-8',
			);

			console.log(`Processing complete!`);
		} catch (error) {
			console.error(error);
		}
	})
	.description(
		'Initialize the basic steps of creating the files and setting up code.',
	);

export default program;
