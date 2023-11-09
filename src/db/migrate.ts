import { sql } from "drizzle-orm";
import db from "./db";
import { migrate } from 'drizzle-orm/sqlite-proxy/migrator';

migrate(db, async (migrationQueries: string[]) => {
    for (const query of migrationQueries) {
        await db.run(sql.raw(query));
    }
}, { migrationsFolder: './drizzle' }).catch((error: Error) => {
    console.log("An error has occurred on migration.")
    console.log({ error })
}).then(() => {
    console.log("Migration is completed.")
});