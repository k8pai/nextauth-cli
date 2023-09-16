import fs from 'fs';
import path from 'path';
import { red, yellow, italic, bold } from 'picocolors';
import {
	CreateFolderAndWrite,
	GenerateAdapterConfigurations,
	generateBaseInitialTemplate,
	sleep,
} from './helpers';
import { ExtentionTypes, OptionsType } from '../typings';
import { Adapters } from './Adapters';
import { createSpinner } from 'nanospinner';
// import ora from 'ora';

// const spinner = ora('Loading unicorns').start();

// setTimeout(() => {
// 	spinner.color = 'yellow';
// 	spinner.text = 'Loading rainbows';
// }, 1000);
export const NextGenerator = async (
	options: OptionsType,
	dir: 'app' | 'pages',
	target: 'api/auth/[...nextauth]' | 'api/auth',
	file: '[...nextauth]' | 'route',
) => {
	const { ts, adapter, db, router, provider, ...config } = options;

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
		// CreateFolderAndWrite(
		// 	`${dir}/${target}`,
		// 	`${file}${ext}`,
		// 	generateBaseInitialTemplate(config, ts, adapter, router),
		// );

		if (!fs.existsSync(targetDirectory)) {
			fs.mkdirSync(targetDirectory, { recursive: true });
		}

		fs.writeFileSync(
			filePath,
			generateBaseInitialTemplate(config, ts, adapter, router),
			'utf-8',
		);

		if (adapter) {
			if (Adapters[adapter]) {
				GenerateAdapterConfigurations(ext, db, adapter);
			} else {
				// console.log(
				// 	`No such Adapter support is available. Did you mean '${checkSimilarAdapter(
				// 		adapter,
				// 	)}'?`,
				// );
			}
		}
		// console.log(`Processing complete!`);
	} catch (error) {
		console.log('error from catch');
		console.error(red(error as string));
	}
};
