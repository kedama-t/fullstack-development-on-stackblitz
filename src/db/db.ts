import sqlite3 from 'sqlite3';
import { drizzle } from 'drizzle-orm/sqlite-proxy';

// https://github.com/drizzle-team/drizzle-orm/issues/1227
const after = `
CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    hash text NOT NULL,
    created_at numeric
)`;
const before = '\n' +
    '\t\tCREATE TABLE IF NOT EXISTS "__drizzle_migrations" (\n' +
    '\t\t\tid SERIAL PRIMARY KEY,\n' +
    '\t\t\thash text NOT NULL,\n' +
    '\t\t\tcreated_at numeric\n' +
    '\t\t)\n' +
    '\t';

const database = new sqlite3.Database("./data/dev.sqlite");
const remoteDataBase = drizzle(async (sql, params, method) => {
    const sqlProcessed = sql === before ? after : sql;
    console.log({ sql, params, method })
    try {
        const operation = method === 'run' ? run(database, sqlProcessed, params)
            : method === 'all' || method === 'values' ? all(database, sqlProcessed, params)
                : method === 'get' ? get(database, sqlProcessed, params)
                    : null;
        if (!operation) { throw new Error(`Method '${method}' is not implemented.`) }

        const result = await operation;
        return { rows: result as any[] };
    } catch (e: any) {
        console.error('An error has occured: ', e)
        return { rows: [] };
    }
});

const run = (db: sqlite3.Database, sql: string, ...params: any[]) => {
    return new Promise((resolve, reject) => {
        db.run(sql, ...params, function (this: sqlite3.RunResult, err: Error) {
            if (err) {
                return reject(err);
            }
            resolve([
                this.lastID,
                this.changes
            ]);
        });
    });
}
const get = (db: sqlite3.Database, sql: string, ...params: any[]) => {
    return new Promise((resolve, reject) => {
        db.get(sql, ...params, function (this: sqlite3.Statement, err: Error, row: any) {
            if (err) {
                return reject(err);
            }
            // convert object to value[]
            const result = convertObjectToArray(row)
            resolve(result);
        });
    });
}
const all = (db: sqlite3.Database, sql: string, ...params: any[]) => {
    return new Promise((resolve, reject) => {
        db.all(sql, ...params, function (this: sqlite3.Statement, err: Error, rows: any[]) {
            if (err) {
                return reject(err);
            }
            // convert object to value[][]
            const result = convertObjectToArray(rows).map((row) => convertObjectToArray(row))
            resolve(result);
        });
    });
}

const convertObjectToArray = (object: object) => {
    return Object.entries(object).map(([key, value]) => (value))
}

export default remoteDataBase;