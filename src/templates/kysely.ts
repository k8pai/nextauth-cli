export const GenerateKyselyConfig = () => {
	return `import { PostgresDialect } from "kysely";
import { Pool } from "pg";

// This adapter exports a wrapper of the original 'Kysely' class called 'KyselyAuth',
// that can be used to provide additional type-safety.
// While using it isn't required, it is recommended as it will verify
// that the database interface has all the fields that Auth.js expects.
import { KyselyAuth } from "@auth/kysely-adapter";

import type { GeneratedAlways } from "kysely";

interface Database {
	User: {
		id: GeneratedAlways<string>;
		name: string | null;
		email: string;
		emailVerified: Date | null;
		image: string | null;
	};
	Account: {
		id: GeneratedAlways<string>;
		userId: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token: string | null;
		access_token: string | null;
		expires_at: number | null;
		token_type: string | null;
		scope: string | null;
		id_token: string | null;
		session_state: string | null;
	};
	Session: {
		id: GeneratedAlways<string>;
		userId: string;
		sessionToken: string;
		expires: Date;
	};
	VerificationToken: {
		identifier: string;
		token: string;
		expires: Date;
	};
}

export const db = new KyselyAuth<Database>({
	dialect: new PostgresDialect({
		pool: new Pool({
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_NAME,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
		}),
	}),
});`;
};
