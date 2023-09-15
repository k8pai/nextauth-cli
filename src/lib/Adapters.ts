export const Adapters = {
	dgraph: {
		title: 'Dgraph',
		importOptions: [
			{
				defaultImport: false,
				name: 'DgraphAdapter',
				path: '@auth/dgraph-adapter',
			},
			{
				defaultImport: false,
				name: 'config',
				path: '@lib/config',
			},
		],
		description: 'DgraphAdapter',
		name: 'dgraph',
		importName: 'DgraphAdapter',
		path: 'dgraph-adapter',
		adapterParams: 'config',
		secrets: [
			'DGRAPH_GRAPHQL_ENDPOINT',
			'DGRAPH_GRAPHQL_KEY',
			'AUTH_HEADER',
			'SECRET',
		],
	},
	drizzle: {
		title: 'Drizzle',
		importOptions: [
			{
				defaultImport: false,
				name: 'DrizzleAdapter',
				path: '@auth/drizzle-adapter',
			},
			{
				defaultImport: false,
				name: 'db',
				path: '@lib/schema',
			},
		],
		description: 'DrizzleAdapter',
		name: 'drizzle',
		importName: 'DrizzleAdapter',
		path: 'drizzle-adapter',
		adapterParams: 'db',
		secrets: [],
	},
	dynamodb: {
		title: 'DynamoDB',
		importOptions: [
			{
				defaultImport: false,
				name: 'DynamoDBAdapter',
				path: '@auth/dynamodb-adapter',
			},
			{
				defaultImport: false,
				name: 'client',
				path: '@lib/dynamodb',
			},
		],
		description: 'DynamoDBAdapter',
		name: 'dynamodb',
		importName: 'DynamoDBAdapter',
		path: 'dynamodb-adapter',
		adapterParams: 'client',
		secrets: [
			'NEXT_AUTH_AWS_ACCESS_KEY',
			'NEXT_AUTH_AWS_SECRET_KEY',
			'NEXT_AUTH_AWS_REGION',
		],
	},
	fauna: {
		title: 'Fauna',
		importOptions: [
			{
				defaultImport: false,
				name: 'FaunaAdapter',
				path: '@auth/fauna-adapter',
			},
			{
				defaultImport: false,
				name: 'client',
				path: '@lib/fauna',
			},
		],
		description: 'FaunaAdapter',
		name: 'fauna',
		importName: 'FaunaAdapter',
		path: 'fauna-adapter',
		adapterParams: 'client',
		secrets: [],
	},
	firebase: {
		title: 'Firestore',
		importOptions: [
			{
				defaultImport: false,
				name: 'FirestoreAdapter',
				path: '@auth/firebase-adapter',
			},
			{
				defaultImport: false,
				name: 'firestore',
				path: '@liv/firestore',
			},
		],
		description: 'FirestoreAdapter',
		name: 'firebase',
		importName: 'FirestoreAdapter',
		path: 'firebase-adapter',
		adapterParams: 'firestore',
		secrets: [
			'FIREBASE_PROJECT_ID',
			'FIREBASE_CLIENT_EMAIL',
			'FIREBASE_PRIVATE_KEY',
		],
	},
	kysely: {
		title: 'Kysely',
		importOptions: [
			{
				defaultImport: false,
				name: 'KyselyAdapter',
				path: '@auth/kysely-adapter',
			},
			{
				defaultImport: false,
				name: 'db',
				path: '@lib/db',
			},
		],
		description: 'KyselyAdapter',
		name: 'kysely',
		importName: 'KyselyAdapter',
		path: 'kysely-adapter',
		adapterParams: 'db',
		secrets: [],
	},
	mikroOrm: {
		title: 'Mikro Orm',
		importOptions: [
			{
				defaultImport: false,
				name: 'MikroOrmAdapter',
				path: '@auth/mikro-orm-adapter',
			},
			{
				defaultImport: false,
				name: 'config',
				path: '@lib/config',
			},
		],
		description: 'MikroOrmAdapter',
		name: 'mikro-orm',
		importName: 'MikroOrmAdapter',
		path: 'mikro-orm-adapter',
		adapterParams: 'config',
		secrets: [],
	},
	mongodb: {
		title: 'MongoDB',
		importOptions: [
			{
				defaultImport: false,
				name: 'MongoDBAdapter',
				path: '@auth/mongodb-adapter',
			},
			{
				defaultImport: true,
				name: 'clientPromise',
				path: '@auth/mongodb-adapter',
			},
		],
		description: 'MongoDBAdapter',
		name: 'mongodb',
		importName: 'MongoDBAdapter',
		path: 'mongodb-adapter',
		adapterParams: 'clientPromise',
		secrets: ['MONGODB_URI'],
	},
	neo4j: {
		title: 'Neo4j',
		importOptions: [
			{
				defaultImport: false,
				name: 'Neo4jAdapter',
				path: '@auth/neo4j-adapter',
			},
			{
				defaultImport: false,
				name: 'neo4jSession',
				path: '@lib/config',
			},
		],
		description: 'Neo4jAdapter',
		name: 'neo4j',
		importName: 'Neo4jAdapter',
		path: 'neo4j-adapter',
		adapterParams: 'neo4jSession',
		secrets: [],
	},
	pouchdb: {
		title: 'PouchDB',
		importOptions: [
			{
				defaultImport: false,
				name: 'PouchDBAdapter',
				path: '@auth/pouchdb-adapter',
			},
		],
		description: 'PouchDBAdapter',
		name: 'pouchdb',
		importName: 'PouchDBAdapter',
		path: 'pouchdb-adapter',
		adapterParams: 'pouchdb',
		secrets: [],
	},
	prisma: {
		title: 'Prisma',
		importOptions: [
			{
				defaultImport: false,
				name: 'PrismaAdapter',
				path: '@auth/prisma-adapter',
			},
			{
				defaultImport: true,
				name: 'prisma',
				path: '@lib/prisma',
			},
		],
		description: 'PrismaAdapter',
		name: 'prisma',
		importName: 'PrismaAdapter',
		path: 'prisma-adapter',
		adapterParams: 'prisma',
		secrets: ['DATABASE_URL'],
	},
	sequalize: {
		title: 'Sequelize',
		importOptions: [
			{
				defaultImport: false,
				name: 'SequelizeAdapter',
				path: '@auth/sequelize-adapter',
			},
			{
				defaultImport: true,
				name: 'sequelize',
				path: '@lib/config',
			},
		],
		description: 'SequelizeAdapter',
		name: 'sequelize',
		importName: 'SequelizeAdapter',
		path: 'sequelize-adapter',
		adapterParams: 'sequelize',
		secrets: ['CONNECTION_URL'],
	},
	supabase: {
		title: 'Supabase',
		importOptions: [
			{
				defaultImport: false,
				name: 'SupabaseAdapter',
				path: '@auth/supabase-adapter',
			},
			{
				defaultImport: false,
				name: 'config',
				path: '@lib/config',
			},
		],
		description: 'SupabaseAdapter',
		name: 'supabase',
		importName: 'SupabaseAdapter',
		path: 'supabase-adapter',
		adapterParams: 'config',
		secrets: ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'],
	},
	typeorm: {
		title: 'Type ORM',
		importOptions: [
			{
				defaultImport: false,
				name: 'TypeORMAdapter',
				path: '@auth/typeorm-adapter',
			},
		],
		description: 'TypeORMAdapter',
		name: 'typeorm',
		importName: 'TypeORMAdapter',
		path: 'typeorm-adapter',
		adapterParams: 'process.env.CONNECTION_URL',
		secrets: ['CONNECTION_URL'],
	},
	upstashRedis: {
		title: 'Upstash Redis',
		importOptions: [
			{
				defaultImport: false,
				name: 'UpstashRedisAdapter',
				path: '@auth/upstash-redis-adapter',
			},
			{
				defaultImport: true,
				name: 'redis',
				path: '@lib/redis',
			},
		],
		description: 'UpstashRedisAdapter',
		name: 'upstash-redis',
		importName: 'UpstashRedisAdapter',
		path: 'upstash-redis-adapter',
		adapterParams: 'redis',
		secrets: ['UPSTASH_REDIS_URL', 'UPSTASH_REDIS_TOKEN'],
	},
	xata: {
		title: 'Xata',
		importOptions: [
			{
				defaultImport: false,
				name: 'XataAdapter',
				path: '@auth/xata-adapter',
			},
			{
				defaultImport: false,
				name: 'XataClient',
				path: '@lib/xata',
			},
		],
		description: 'XataAdapter',
		name: 'xata',
		importName: 'XataAdapter',
		path: 'xata-adapter',
		adapterParams: 'client',
		secrets: [],
	},
};

export const adapterChoices = Object.entries(Adapters).map(
	([key, value], _) => {
		const { title, description } = value;
		return {
			title,
			description,
			value: key,
			disabled: false,
		};
	},
);
