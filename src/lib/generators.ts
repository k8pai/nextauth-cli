import fs from 'fs';
import path from 'path';
import { OptionsType } from '../lib/Providers';
import {
	GenerateAdapterConfigurations,
	generateBaseInitialTemplate,
} from './helpers';

export const NextGenerator = async (
	options: OptionsType,
	dir: 'app' | 'pages',
	target: 'api/auth/[...nextauth]' | 'api/auth',
	file: '[...nextauth]' | 'route',
) => {
	const { ts, adapter, db, ...config } = options;

	console.log('adapters value => ', adapter);

	let baseDirectory = path.join(process.cwd(), dir);
	let targetDirectory = path.join(baseDirectory, target);
	let ext: '.js' | '.ts' = ts ? '.ts' : '.js';
	let filePath = path.join(targetDirectory, `${file}${ext}`);

	if (!fs.existsSync(baseDirectory)) {
		console.error(
			`The "${baseDirectory}" folder does not exist. Maybe you got your directory structure messed up... try using \n'nextauth init --help'`,
		);
		return;
	}

	try {
		if (!fs.existsSync(targetDirectory)) {
			fs.mkdirSync(targetDirectory, { recursive: true });
		}

		fs.writeFileSync(
			filePath,
			generateBaseInitialTemplate(config, ts, adapter),
			'utf-8',
		);

		if (adapter) {
			GenerateAdapterConfigurations(adapter, ext, db);
		}
		console.log(`Processing complete!`);
	} catch (error) {
		console.error(error);
	}
};
