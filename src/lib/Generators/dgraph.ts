import { ExtentionTypes } from '../../typings';
import { CreateFolderAndWrite } from '../helpers';

const GenerateDgraphConfig = () => {
	return `export const config = {
	endpoint: process.env.DGRAPH_GRAPHQL_ENDPOINT,
	authToken: process.env.DGRAPH_GRAPHQL_KEY,
	// you can omit the following properties if you are running an unsecure schema
	authHeader: process.env.AUTH_HEADER, // default: "Authorization",
	jwtSecret: process.env.SECRET,
};`;
};

export const GenerateDgraphAdapter = (ext: ExtentionTypes) => {
	CreateFolderAndWrite('lib', `config${ext}`, GenerateDgraphConfig());
};
