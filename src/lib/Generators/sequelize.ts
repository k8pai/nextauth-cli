import { ExtentionTypes } from '../../typings';
import { CreateFolderAndWrite } from '../helpers';

const GenerateSequelizeConfig = () => {
	return `import { Sequelize } from "sequelize";

// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export default sequelize;`;
};

export const GenerateSequelizeAdapter = (ext: ExtentionTypes) => {
	CreateFolderAndWrite('lib', `config${ext}`, GenerateSequelizeConfig());
};
