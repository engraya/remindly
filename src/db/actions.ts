"use server"
import { collections, tasks } from "./schema";
import { eq } from "drizzle-orm";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { CreateCollectionSchemaType } from "./createCollection";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateTaskShemaType } from "./createTask";
import { sql } from 'drizzle-orm';


const db = drizzle(process.env.DATABASE_URL!);


// Function to get collections with their tasks for a specific user
export async function getUserCollections(userId: string) {
  // First, fetch all collections for the user
  const userCollections = await db
    .select()
    .from(collections)
    .where(eq(collections.userId, userId)); // Filter by userId

  // Now, for each collection, fetch the associated tasks
  const collectionsWithTasks = await Promise.all(
    userCollections.map(async (collection) => {
      const collectionTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.collectionId, collection.id)); // Fetch tasks for the collection

      // Return the collection with an added 'tasks' field
      return {
        ...collection,
        tasks: collectionTasks, // Include the array of tasks
      };
    })
  );

  return collectionsWithTasks; // Return collections with their tasks
}

// Function to fetch the total number of collections
export async function getTotalCollections() {
  try {
    // Query to count the total number of collections
    const totalCollections = await db
      .select({ count: sql`COUNT(*)` })
      .from(collections);

    // Return the total count (the result will be an array with one object)
    return totalCollections[0].count;
  } catch (error) {
    console.error("Error fetching total collections:", error);
    throw new Error("Failed to fetch total collections.");
  }
}

export async function createCollection(form: CreateCollectionSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }
    // Insert collection data into the database
  const collection = await db.insert(collections).values({
    name: form.name,
    color: form.color,
    userId: user.id,
  });
    // Revalidate the cache for the dashboard
  revalidatePath("/dashboard");

  // Return the inserted collection or the result of the database operation
  return collection;
}


export async function deleteCollection(collectionId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  // Convert collectionId to a number since the id column is of type number
  const collectionIdAsNumber = parseInt(collectionId, 10);
  
  if (isNaN(collectionIdAsNumber)) {
    throw new Error("Invalid collection ID");
  }

  // Delete collection data from the database
  await db.delete(collections).where(eq(collections.id, collectionIdAsNumber));

  // Revalidate the cache for the dashboard
  revalidatePath("/dashboard");
}


export async function createTask(data : CreateTaskShemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  // Insert task data into the database
  const task = await db.insert(tasks).values({
    content: data.content,
    userId: user.id,
    collectionId: data.collectionId,
    expireAt: data.expiresAt,
  });

  // Revalidate the cache for the dashboard
  revalidatePath("/dashboard");

  // Return the inserted task or the result of the database operation
  return task;

}  

export async function setTaskToDone(taskId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  // Convert taskId to a number since the id column is of type number
  const taskIdAsNumber = parseInt(taskId, 10);

  if (isNaN(taskIdAsNumber)) {
    throw new Error("Invalid task ID");
  }

  // Update task data in the database
  await db.update(tasks).set({ done: true }).where(eq(tasks.id, taskIdAsNumber));

  // Revalidate the cache for the dashboard
  revalidatePath("/dashboard");
}