import express from 'express';
import { Controller } from './Controller';
import { Token } from './Entity/Token';
import { createConnection } from 'typeorm';
import { Client } from './Entity/Client';

const app = express();

createConnection({
    type: "postgres",
    host: process.env.POSTGRES_SERVER || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    entities: [
        Client,
        Token
    ],
    synchronize: true,
    logging: true
}).then(() => {
    const controller = new Controller();

    // TODO: This should likely be refactored into a server side script or something protected.
    app.post('/client', controller.generateClient);
    
    app.post('/token', controller.generateToken);

    app.listen(3000, () => {
        console.log("App started on port 3000.")
    });
}).catch(error => console.log(error));
