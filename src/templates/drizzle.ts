import { drizzleDbTypes } from '../typings';

export const GenerateDrizzleSchema = (db: drizzleDbTypes = 'postgres') => {
	const adapter: Record<drizzleDbTypes, string> = {
		postgres: `import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token),
	})
);`,
		mysql: `import {
	int,
	timestamp,
	mysqlTable,
	primaryKey,
	varchar,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", {
		mode: "date",
		fsp: 3,
	}).defaultNow(),
	image: varchar("image", { length: 255 }),
});

export const accounts = mysqlTable(
	"account",
	{
		userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
		type: varchar("type", { length: 255 })
		.$type<AdapterAccount["type"]>()
		.notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
		refresh_token: varchar("refresh_token", { length: 255 }),
		access_token: varchar("access_token", { length: 255 }),
		expires_at: int("expires_at"),
		token_type: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		id_token: varchar("id_token", { length: 255 }),
		session_state: varchar("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
);

export const sessions = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
	userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
	"verificationToken",
	{
		identifier: varchar("identifier", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token),
	})
);`,
		sqlite: `import {
	integer,
	sqliteTable,
	text,
	primaryKey,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
	image: text("image"),
});

export const accounts = sqliteTable(
	"account",
	{
		userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
);

export const sessions = sqliteTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token),
	})
);`,
	};

	return adapter[db];
};
