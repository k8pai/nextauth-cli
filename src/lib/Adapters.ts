export const Adapters = {
	dgraph: {
		name: 'dgraph',
		importName: 'DgraphAdapter',
		path: 'dgraph-adapter',
		endpoint: 'DGRAPH_GRAPHQL_ENDPOINT',
		authToken: 'DGRAPH_GRAPHQL_KEY',
		// you can omit the following properties if you are running an unsecure schema
		authHeader: 'AUTH_HEADER', // default: "Authorization",
		jwtSecret: 'SECRET',
	},
	drizzle: {
		name: 'drizzle',
		importName: 'DrizzleAdapter',
		path: 'drizzle-adapter',
	},
	dynamodb: {
		name: 'dynamodb',
		importName: 'DynamoDBAdapter',
		path: 'dynamodb-adapter',
	},
	fauna: {
		name: 'fauna',
		importName: 'FaunaAdapter',
		path: 'fauna-adapter',
	},
	firebase: {
		name: 'firebase',
		importName: 'FirestoreAdapter',
		path: 'firebase-adapter',
	},
	kysely: {
		name: 'kysely',
		importName: 'KyselyAdapter',
		path: 'kysely-adapter',
	},
	mikroOrm: {
		name: 'mikro-orm',
		importName: 'MikroOrmAdapter',
		path: 'mikro-orm-adapter',
	},
	mongodb: {
		name: 'mongodb',
		importName: 'MongoDBAdapter',
		path: 'mongodb-adapter',
	},
	neo4j: {
		name: 'neo4j',
		importName: 'Neo4jAdapter',
		path: 'neo4j-adapter',
	},
	pouchdb: {
		name: 'pouchdb',
		importName: 'PouchDBAdapter',
		path: 'pouchdb-adapter',
	},
	prisma: {
		name: 'prisma',
		importName: 'PrismaAdapter',
		path: 'prisma-adapter',
	},
	sequalize: {
		name: 'sequelize',
		importName: 'SequelizeAdapter',
		path: 'sequelize-adapter',
	},
	supabase: {
		name: 'supabase',
		importName: 'SupabaseAdapter',
		path: 'supabase-adapter',
	},
	typeorm: {
		name: 'typeorm',
		importName: 'TypeORMAdapter',
		path: 'typeorm-adapter',
	},
	upstashRedis: {
		name: 'upstash-redis',
		importName: 'UpstashRedisAdapter',
		path: 'upstash-redis-adapter',
	},
	xata: {
		name: 'xata',
		importName: 'XataAdapter',
		path: 'xata-adapter',
	},
};

export type Adapter = typeof Adapters;

export type AdapterType = keyof typeof Adapters;

export type DBType = 'mongodb' | 'postgresql';
