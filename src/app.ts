import express from 'express';
import { Controller } from './Controller';
import { Token } from './Entity/Token';
import { createConnection } from 'typeorm';

const app = express();

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: [
        Token
    ],
    synchronize: true,
    logging: true
}).then(connection => {
    const controller = new Controller();

    app.post('/token', controller.postToken);

    app.listen(3000, () => {
        console.log("App started on port 3000.")
    });
}).catch(error => console.log(error));
