import {
  pgTable,
  serial,
  varchar,
  boolean,
  uniqueIndex,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const collections = pgTable(
  "collections",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    color: varchar("color", { length: 50 }).default("Sunset"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueNameUserId: uniqueIndex("unique_name_user_id").on(
      table.name,
      table.userId
    ),
    userIdIdx: index("collections_user_id_idx").on(table.userId),
  })
);

export const tasks = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    done: boolean("done").default(false).notNull(),
    expireAt: timestamp("expire_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    collectionId: integer("collection_id")
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
  },
  (table) => ({
    userIdIdx: index("tasks_user_id_idx").on(table.userId),
    collectionIdIdx: index("tasks_collection_id_idx").on(table.collectionId),
  })
);

export const collectionsRelations = relations(collections, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  collection: one(collections, {
    fields: [tasks.collectionId],
    references: [collections.id],
  }),
}));

export type Collection = typeof collections.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type CollectionWithTasks = Collection & { tasks: Task[] };
