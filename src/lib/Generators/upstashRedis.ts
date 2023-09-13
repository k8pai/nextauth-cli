import { ExtentionTypes } from '../../typings';
import { CreateFolderAndWrite } from '../helpers';

const GenerateUpstashRedisConfig = () => {
	return `import upstashRedisClient from "@upstash/redis";

const redis = upstashRedisClient(
	process.env.UPSTASH_REDIS_URL,
	process.env.UPSTASH_REDIS_TOKEN
);

export default redis;`;
};

export const GenerateUpstashRedisAdapter = (ext: ExtentionTypes) => {
	CreateFolderAndWrite('lib', `redis${ext}`, GenerateUpstashRedisConfig());
};
