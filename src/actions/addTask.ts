"use server";

import db from "@/db/db";
import { tasks } from "@/db/schema";

export default async function addTask(name: string, description: string) {
    await db.insert(tasks).values({ name, description });
}
