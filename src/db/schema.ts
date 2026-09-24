import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const fav_paintings = pgTable("fav_paintings", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    tableauId: text("tableau_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const fav_artist = pgTable("fav_artist", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    artistName: text("artist_name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});