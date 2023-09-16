export const GenerateSequelizeConfig = () => {
	return `import { Sequelize } from "sequelize";

// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export default sequelize;`;
};
