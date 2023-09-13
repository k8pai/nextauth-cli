import fs from 'fs';
import path from 'path';
import {
	GenerateAdapterConfigurations,
	// checkSimilarAdapter,
	generateBaseInitialTemplate,
} from './helpers';
import { ExtentionTypes, OptionsType } from '../typings';
import { Adapters } from './Adapters';

export const NextGenerator = async (
	options: OptionsType,
	dir: 'app' | 'pages',
	target: 'api/auth/[...nextauth]' | 'api/auth',
	file: '[...nextauth]' | 'route',
) => {
	const { ts, adapter, db, ...config } = options;

	let baseDirectory = path.join(process.cwd(), dir);
	let targetDirectory = path.join(baseDirectory, target);
	let ext: ExtentionTypes = ts ? '.ts' : '.js';
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
		console.log(`Processing complete!`);
	} catch (error) {
		console.error(error);
	}
};
