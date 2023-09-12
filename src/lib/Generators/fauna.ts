import fs from 'fs';
import path from 'path';
import { ExtentionTypes } from '../../typings';

const GenerateFaunaConfig = () => {
	return `import { Client } from 'faunadb';
	
const client = new FaunaClient({
	secret: "secret",
	scheme: "http",
	domain: "localhost",
	port: 8443,
})

export default client;`;
};

export const GenerateFaunaAdapter = (ext: ExtentionTypes) => {
	const lib = path.join(process.cwd(), 'lib');
	let file = path.join(lib, `fauna${ext}`);

	if (!fs.existsSync(lib)) {
		fs.mkdirSync(lib, { recursive: true });
	}

	fs.writeFileSync(file, GenerateFaunaConfig(), 'utf-8');
};
