import { ExtentionTypes } from '../../typings';
import { CreateFolderAndWrite } from '../helpers';

const GenerateMikroOrmConfig = () => {
	return `// MikroORM options object. Ref: https://mikro-orm.io/docs/next/configuration#driver

export const config = {
	dbName: "./db.sqlite",
	type: "sqlite",
	debug: process.env.DEBUG === "true" || process.env.DEBUG?.includes("db"),
}`;
};

export const GenerateMikroOrmAdapter = (ext: ExtentionTypes) => {
	CreateFolderAndWrite('lib', `config.ts`, GenerateMikroOrmConfig());
};
