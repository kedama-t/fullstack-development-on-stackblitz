import db from "./db";
import { tasks } from "./schema";

(async () => {
    await db.insert(tasks).values([
        { id: 1, name: "買い物", description: "牛乳を買う" },
        { id: 2, name: "ジム", description: "筋トレ３０分、有酸素３０分" },
        { id: 3, name: "読書", description: "リーダブルコード続き" },
    ]);
})();
