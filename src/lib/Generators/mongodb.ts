import fs from 'fs';
import path from 'path';
import { DBType } from '../Adapters';

export const GenerateMongodbClient = (ext: '.js' | '.ts') => {
	return `// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise${ext === '.ts' ? `: Promise<MongoClient>;` : ';'}

if (process.env.NODE_ENV === "development") {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	if (!global._mongoClientPromise) {
	client = new MongoClient(uri, options);
	global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;`;
};

export const GenerateMongodbAdapter = (ext: '.js' | '.ts' = '.js') => {
	const lib = path.join(process.cwd(), 'lib');
	const file = path.join(lib, `mongodb${ext}`);

	if (!fs.existsSync(lib)) {
		fs.mkdirSync(lib, { recursive: true });
	}

	fs.writeFileSync(file, GenerateMongodbClient(ext), 'utf-8');
};
