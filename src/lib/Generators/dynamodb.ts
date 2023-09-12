import fs from 'fs';
import path from 'path';
import { ExtentionTypes } from '../../typings';
import { CreateFolderAndWrite } from '../helpers';

const GenerateDynamodbConfig = (ext: ExtentionTypes) => {
	return `import { DynamoDB${
		ext === '.ts' ? `, DynamoDBClientConfig ` : ` `
	}} from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"

export const config${ext === '.ts' ? `: DynamoDBClientConfig ` : ` `}= {
	credentials: {
		accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY${
			ext === '.ts' ? ` as string,` : `,`
		}
		secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY${
			ext === '.ts' ? ` as string,` : `,`
		}
	},
	region: process.env.NEXT_AUTH_AWS_REGION,
};

export const client = DynamoDBDocument.from(new DynamoDB(config), {
	marshallOptions: {
		convertEmptyValues: true,
		removeUndefinedValues: true,
		convertClassInstanceToMap: true,
	},
})`;
};

export const GenerateDynamodbAdapter = (ext: ExtentionTypes) => {
	let folder = 'lib',
		file = `dynamodb${ext}`,
		content = GenerateDynamodbConfig(ext);
	CreateFolderAndWrite(folder, file, content);
};
