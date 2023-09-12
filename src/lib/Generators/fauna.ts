import fs from 'fs';
import path from 'path';
import { ExtentionTypes } from '../../typings';
import { CreateFolderAndWrite } from '../helpers';

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
	let folder = 'lib',
		file = `fauna${ext}`,
		content = GenerateFaunaConfig();
	CreateFolderAndWrite(folder, file, content);
};
