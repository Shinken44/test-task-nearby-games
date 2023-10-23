import express from 'express';
import config from 'config';
import main from './routes';
import fs from "fs";
import https from "https";
import http from "http";
import UsersQuery from "./database/users-query";

const cors = require('cors')

const port: number = config.get('port');
const app: any = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(main);

const runApp = async (): Promise<void> => {
    try {
        let server

        await UsersQuery.prepare()
        console.log(`database have prepared`)

        const sslSettings: any = config.get('ssl');
        if (sslSettings.secure) {
            const httpsOptions = {
                key: fs.readFileSync(sslSettings.secureKey),
                cert: fs.readFileSync(sslSettings.secureCert),
                ca: fs.readFileSync(sslSettings.secureChain)
            };
            server = https.createServer(httpsOptions, app);
        } else {
            server = http.createServer(app);
        }

        await server.listen(port);
        console.log(`listen port ${port}`);
    } catch(e) {
        console.log(`failed`, e.message);
        process.exit();
    }
}

runApp().catch(e => console.log(e));
