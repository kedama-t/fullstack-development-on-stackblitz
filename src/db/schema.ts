import {
  sqliteTable,
  text,
  integer
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

const id = {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
};
const timestamps = {
  createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updatedAt').default(sql`CURRENT_TIMESTAMP`),
  deletedAt: text('deletedAt'),
};
const schemaBase = {
  ...id,
  ...timestamps,
};

export const tasks = sqliteTable('tasks', {
  ...schemaBase,
  name: text('name'),
  description: text('description'),
});