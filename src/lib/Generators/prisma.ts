import fs from 'fs';
import path from 'path';
import { DBType } from '../Adapters';

export const GeneratePrismaSchema = (db: DBType = 'postgresql') => {
	const schema = {
		postgresql: `datasource db {
	provider = "postgresql"
	url      = env("DATABASE_URL")
}

generator client {
	provider        = "prisma-client-js"
}

model Account {
	id                 String  @id @default(cuid())
	userId             String
	type               String
	provider           String
	providerAccountId  String
	refresh_token      String?  @db.Text
	access_token       String?  @db.Text
	expires_at         Int?
	token_type         String?
	scope              String?
	id_token           String?  @db.Text
	session_state      String?

	user User @relation(fields: [userId], references: [id], onDelete: Cascade)

	@@unique([provider, providerAccountId])
}

model Session {
	id           String   @id @default(cuid())
	sessionToken String   @unique
	userId       String
	expires      DateTime
	user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
	id            String    @id @default(cuid())
	name          String?
	email         String?   @unique
	emailVerified DateTime?
	image         String?
	accounts      Account[]
	sessions      Session[]
}

model VerificationToken {
	identifier String
	token      String   @unique
	expires    DateTime

	@@unique([identifier, token])
}`,
		mongodb: `datasource db {
	provider = "mongodb"
	url      = env("DATABASE_URL")
}

generator client {
	provider = "prisma-client-js"
}

model Account {
	id                 String  @id @default(auto()) @map("_id") @db.ObjectId
	userId             String  @db.ObjectId @map("user_id")
	type               String
	provider           String
	providerAccountId  String  @map("provider_account_id")
	refresh_token      String? @db.String
	access_token       String? @db.String
	expires_at         Int?
	token_type         String?
	scope              String?
	id_token           String? @db.String
	session_state      String?

	user User @relation(fields: [userId], references: [id], onDelete: Cascade)

	@@unique([provider, providerAccountId])
	@@map("accounts")
}

model Session {
	id           String   @id @default(auto()) @map("_id") @db.ObjectId
	sessionToken String   @unique @map("session_token")
	userId       String   @db.ObjectId @map("user_id")
	expires      DateTime
	user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

	@@map("sessions")
}

model User {
	id            String    @id @default(auto()) @map("_id") @db.ObjectId
	name          String?
	email         String?   @unique
	emailVerified DateTime? @map("email_verified")
	image         String?
	accounts      Account[]
	sessions      Session[]

	@@map("users")
}

model VerificationToken {
	identifier String
	token      String   @unique
	expires    DateTime

	@@unique([identifier, token])
	@@map("verificationtokens")
}`,
	};

	return schema[db];
};

export const GeneratePrismaConfig = () => {
	return `import { PrismaClient } from "@prisma/client";
		
const prisma = new PrismaClient();

export default prisma;`;
};

export const GeneratePrismaAdapter = (
	ext: '.js' | '.ts' = '.js',
	db?: DBType,
) => {
	const lib = path.join(process.cwd(), 'lib');
	const schema = path.join(process.cwd(), 'prisma');
	let libPath = path.join(lib, `prisma${ext}`);
	let schemaPath = path.join(schema, `schema.prisma`);

	if (!fs.existsSync(lib)) {
		fs.mkdirSync(lib, { recursive: true });
	}

	if (!fs.existsSync(schema)) {
		fs.mkdirSync(schema, { recursive: true });
	}

	fs.writeFileSync(libPath, GeneratePrismaConfig(), 'utf-8');
	fs.writeFileSync(schemaPath, GeneratePrismaSchema(db), 'utf-8');

	GenerateEnvVariables(db);
};

const GenerateEnvVariables = (db: DBType = 'postgresql') => {
	let envVariables =
		'DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"\n';

	envVariables =
		db === 'mongodb'
			? 'DATABASE_URL="mongodb+srv://test:test@cluster0.ns1yp.mongodb.net/myFirstDatabase"\n'
			: envVariables;

	fs.access('.env.example', fs.constants.F_OK, (err) => {
		if (err) {
			// If the file doesn't exist, create it and write contents
			fs.writeFile('.env.example', envVariables, (err) => {
				if (err) {
					console.error('Error creating file:', err);
					return;
				}
				console.log('Added DATABASE_URL to `.env.example`!');
			});
		} else {
			fs.readFile('.env.example', 'utf8', (err, data) => {
				if (err) {
					console.error('Error reading file:', err);
					return;
				}

				const updatedData = data.replace(
					/DATABASE_URL=.*/,
					db === 'mongodb'
						? 'DATABASE_URL="mongodb+srv://test:test@cluster0.ns1yp.mongodb.net/myFirstDatabase"'
						: 'DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"',
				);

				// Append DATABASE_URL if it doesn't exist
				fs.writeFile('.env.example', updatedData, (err) => {
					if (err) {
						console.error('Error appending to file:', err);
						return;
					}
				});
			});
		}
	});
};
