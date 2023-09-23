import fs from 'fs';
import path from 'path';
import { red, yellow, italic, bold } from 'picocolors';
import {
	CreateFileAndWrite,
	CreateFolderAndWrite,
	GenerateAdapterConfigurations,
	GenerateEnvVariables,
	GenerateSveltekitEnvVariables,
	GenerateSveltekitTemplate,
	GenerateTemplate,
	sleep,
} from './helpers';
import { ExtentionTypes, OptionsType, SveltekitOptionsType } from '../typings';
import { Adapters } from './Adapters';
import { createSpinner } from 'nanospinner';

export const NextGenerator = async (
	options: OptionsType,
	dir: 'app' | 'pages',
	target: 'api/auth/[...nextauth]' | 'api/auth',
	file: '[...nextauth]' | 'route',
) => {
	const { ts, adapter, db, router, provider, secret, ...config } = options;

	let baseDirectory = path.join(process.cwd(), dir);
	let targetDirectory = path.join(baseDirectory, target);
	let ext: ExtentionTypes = ts ? '.ts' : '.js';
	let filePath = path.join(targetDirectory, `${file}${ext}`);

	const nextGenerator = createSpinner('Processing Folder Structure.', {
		color: 'cyan',
	}).start();

	if (!fs.existsSync(baseDirectory)) {
		let styledCommand = yellow(bold('npx nextauth --router='));
		let styledIssue = yellow(
			italic('https://github.com/k8pai/nextauth-cli/issues'),
		);

		nextGenerator.error({
			text: `Retry with ${styledCommand} or raise an issue - ${styledIssue}`,
		});
		return;
	}
	await sleep(400);
	nextGenerator.success({
		text: 'Folder Structure.',
	});

	try {
		// create initial [...nextauth].{ts/js} files
		if (!fs.existsSync(targetDirectory)) {
			fs.mkdirSync(targetDirectory, { recursive: true });
		}

		fs.writeFileSync(
			filePath,
			GenerateTemplate(config, ts, adapter, router, secret),
			'utf-8',
		);

		// Generate env variables in a .env.example files if env flag is provided.
		GenerateEnvVariables(options);

		// Generate env variables in a .env.example files if env flag is provided.
		GenerateAdapterConfigurations(ext, db, adapter);
	} catch (error) {
		console.error(red(error as string));
	}
};

export const SveltekitGenerator = (
	options: SveltekitOptionsType,
	dir: 'src' = 'src',
) => {
	const { env, ts, adapter, secret, dynamic, db, ...rest } = options;

	let ext: ExtentionTypes = ts ? '.ts' : '.js';

	CreateFileAndWrite(
		dir,
		'hooks.server.ts',
		GenerateSveltekitTemplate(rest, adapter, env, ts, secret, db, dynamic),
	);

	GenerateSveltekitEnvVariables(options);

	// Generate env variables in a .env.example files if env flag is provided.
	GenerateAdapterConfigurations(ext, db, adapter);
};
