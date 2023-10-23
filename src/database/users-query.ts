import db from "./db";
import {Users} from "./models";

export default class UsersQuery {
    public static async prepare () {
        try {
            await db.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id integer PRIMARY KEY,
                    balance integer                    
                );

                DELETE FROM users;
                
                INSERT INTO users VALUES (1, 10000);
            `);
        } catch(e) {
            throw new Error(`UsersQuery.prepare: ${e.message}`);
        }
    }

    public static async updateBalance (userId: number, amount: number): Promise<Users> {
        try {
            const [user] = await db.query(`
                UPDATE users 
                SET balance = balance + $2 
                WHERE id = $1
                RETURNING *
            `, [userId, amount]);

            return user
        } catch(e) {
            throw new Error(`UsersQuery.updateBalance: ${e.message}`);
        }
    }
}
