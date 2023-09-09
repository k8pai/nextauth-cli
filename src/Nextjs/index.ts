import fs from 'fs';
import path from 'path';
import { OptionsType } from '../lib/Providers';
import { generateBaseInitialTemplate } from '../lib/base';

export const NextGenerator = async (
	options: OptionsType & { ts: boolean; env: boolean },
	dir: 'app' | 'pages',
	target: 'api/auth/[...nextauth]' | 'api/auth',
	file: '[...nextauth]' | 'route',
) => {
	const { ts } = options;

	let baseDirectory = path.join(process.cwd(), dir);
	let targetDirectory = path.join(baseDirectory, target);
	let ext = ts ? '.ts' : '.js';
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
			generateBaseInitialTemplate(options),
			'utf-8',
		);

		console.log(`Processing complete!`);
	} catch (error) {
		console.error(error);
	}
};
