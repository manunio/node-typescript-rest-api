import express from 'express';
import config from 'config';
import connect from './utils/connect';
import log from './utils/logger';
import routes from './routes';
import {deserialize} from "v8";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>('port')

const app = express();

// middleware handling request body
app.use(express.json());

// middleware for appending user to request
app.use(deserializeUser)


app.listen(port, async () => {
    log.info(`App is running is at http://localhost:${port}`);

    await connect();

    routes(app);
});