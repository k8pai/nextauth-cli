export const GenerateMikroOrmConfig = () => {
	return `// MikroORM options object. Ref: https://mikro-orm.io/docs/next/configuration#driver

export const config = {
	dbName: "./db.sqlite",
	type: "sqlite",
	debug: process.env.DEBUG === "true" || process.env.DEBUG?.includes("db"),
}`;
};
