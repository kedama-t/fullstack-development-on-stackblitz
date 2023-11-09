"use server";

import db from "@/db/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function updateTask(id: number, name: string, description: string) {
    await db.update(tasks).set({ name, description }).where(eq(tasks.id, id));
}
