export const GenerateFaunaConfig = () => {
	return `import { Client } from 'faunadb';
	
export const client = new FaunaClient({
	secret: "secret",
	scheme: "http",
	domain: "localhost",
	port: 8443,
})`;
};
