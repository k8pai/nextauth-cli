export const Adapters = {
	dgraph: {
		name: 'dgraph',
		importName: 'DgraphAdapter',
		path: 'dgraph-adapter',
		secrets: [
			'DGRAPH_GRAPHQL_ENDPOINT',
			'DGRAPH_GRAPHQL_KEY',
			'AUTH_HEADER',
			'SECRET',
		],
	},
	drizzle: {
		name: 'drizzle',
		importName: 'DrizzleAdapter',
		path: 'drizzle-adapter',
		secrets: [],
	},
	dynamodb: {
		name: 'dynamodb',
		importName: 'DynamoDBAdapter',
		path: 'dynamodb-adapter',
		secrets: [],
	},
	fauna: {
		name: 'fauna',
		importName: 'FaunaAdapter',
		path: 'fauna-adapter',
		secrets: [],
	},
	firebase: {
		name: 'firebase',
		importName: 'FirestoreAdapter',
		path: 'firebase-adapter',
		secrets: [],
	},
	kysely: {
		name: 'kysely',
		importName: 'KyselyAdapter',
		path: 'kysely-adapter',
		secrets: [],
	},
	mikroOrm: {
		name: 'mikro-orm',
		importName: 'MikroOrmAdapter',
		path: 'mikro-orm-adapter',
		secrets: [],
	},
	mongodb: {
		name: 'mongodb',
		importName: 'MongoDBAdapter',
		path: 'mongodb-adapter',
		secrets: ['MONGODB_URI'],
	},
	neo4j: {
		name: 'neo4j',
		importName: 'Neo4jAdapter',
		path: 'neo4j-adapter',
		secrets: [],
	},
	pouchdb: {
		name: 'pouchdb',
		importName: 'PouchDBAdapter',
		path: 'pouchdb-adapter',
		secrets: [],
	},
	prisma: {
		name: 'prisma',
		importName: 'PrismaAdapter',
		path: 'prisma-adapter',
		secrets: ['DATABASE_URL'],
	},
	sequalize: {
		name: 'sequelize',
		importName: 'SequelizeAdapter',
		path: 'sequelize-adapter',
		secrets: [],
	},
	supabase: {
		name: 'supabase',
		importName: 'SupabaseAdapter',
		path: 'supabase-adapter',
		secrets: [],
	},
	typeorm: {
		name: 'typeorm',
		importName: 'TypeORMAdapter',
		path: 'typeorm-adapter',
		secrets: [],
	},
	upstashRedis: {
		name: 'upstash-redis',
		importName: 'UpstashRedisAdapter',
		path: 'upstash-redis-adapter',
		secrets: [],
	},
	xata: {
		name: 'xata',
		importName: 'XataAdapter',
		path: 'xata-adapter',
		secrets: [],
	},
};

export type Adapter = typeof Adapters;

export type AdapterType = keyof typeof Adapters;

export type DBType = 'mongodb' | 'postgresql';
