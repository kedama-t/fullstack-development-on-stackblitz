"use server";

import db from "@/db/db";
import { tasks } from "@/db/schema";
import { isNull } from "drizzle-orm";

export default async function getTasks() {
    const result = await db.select().from(tasks).where(isNull(tasks.deletedAt));
    return result;
}
