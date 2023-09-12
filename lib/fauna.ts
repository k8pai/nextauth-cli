import { Client } from 'faunadb';
	
const client = new FaunaClient({
	secret: "secret",
	scheme: "http",
	domain: "localhost",
	port: 8443,
})

export default client;