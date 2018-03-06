import "reflect-metadata";
import express from 'express';
import { createConnection } from 'typeorm';
import db from './db';
import router from './router';

const app = express();

db.then(() => {
    app.use('/v2/oauth', router);

    app.listen(3000, () => {
        console.log("App started on port 3000.")
    });
}).catch(console.error);
