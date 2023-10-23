import express, {Request} from 'express';
import config from "config";
import UsersQuery from "../database/users-query";

const router: any = express.Router();

router.get('/', async (req: Request, res: any) => {
    try {
        const dbConfig: any = config.get('db')

        res.json({
            name: 'test-nearby-games',
            db: dbConfig.database,
            status: true
        })
    } catch(e) {
        console.log(e);

        res.json({
            success: false,
            error: e.message
        })
    }
})

router.post('/user/balance', async (req: Request, res: any) => {
    let { userId, amount } = req.body;

    try {
        const user = await UsersQuery.updateBalance(userId, amount)

        res.json({
            success: true,
            user
        })
    } catch(e) {
        console.log(e)

        let message = e.message
        if (e.message.includes('users_balance_check')) {
            message = 'The user has insufficient funds in their balance'
        }

        res.json({
            success: false,
            error: {
                message
            }
        })
    }
})

export default router;
