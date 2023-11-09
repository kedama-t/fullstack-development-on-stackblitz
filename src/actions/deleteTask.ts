"use server";

import db from "@/db/db";
import { tasks } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function deleteTask(id: number) {
    await db.update(tasks).set({ deletedAt: sql`CURRENT_TIMESTAMP` }).where(eq(tasks.id, id));
}
