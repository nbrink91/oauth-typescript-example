import "reflect-metadata";
import db from './db';
import container from './container';
import { InversifyExpressServer } from 'inversify-express-utils';

const server = new InversifyExpressServer(container);

db.then(() => {
    const app = server.build();
    app.listen(3000, () => console.log("Server running on port 3000..."))
}).catch(console.error);
