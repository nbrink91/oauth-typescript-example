import { createConnection } from "typeorm";
import Client from "./Entity/Client";
import Token from "./Entity/Token";

const db = createConnection({
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
    logging: true,
    schema: 'oauth'
});

export default db;