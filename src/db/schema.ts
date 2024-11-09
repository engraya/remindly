import { pgTable, serial, varchar, boolean, uniqueIndex, timestamp, integer } from 'drizzle-orm/pg-core';

// Define the Collection table schema
export const collections = pgTable('collections', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  name: varchar('name', { length: 255 }).notNull(), // Collection name
  userId: varchar('user_id', { length: 255 }).notNull(), // Foreign key for the user as VARCHAR
  color: varchar('color', { length: 7 }).default('#ffffff'), // Color (hex code) with default value
  createdAt: timestamp('created_at').defaultNow(), // Timestamp for when the collection was created

}, (collection) => ({
  // Unique constraint on both name and userId
  uniqueNameUserId: uniqueIndex('unique_name_user_id').on(collection.name, collection.userId),
}));

// Define the Task table schema
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(), // Auto-incrementing ID for task
  content: varchar('content', { length: 255 }).notNull(), // Task content as VARCHAR
  userId: varchar('user_id', { length: 255 }).notNull(), // Foreign key for the user
  done: boolean('done').default(false), // Boolean indicating if the task is done (default to false)
  expireAt: timestamp('expire_at'), // Expiration datetime for the task
  createdAt: timestamp('created_at').defaultNow(), // Timestamp for when the task was created (default to now)
  
  // Define the collectionId as a foreign key
  collectionId: integer('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }), 
});
