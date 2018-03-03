import { Request, Response } from 'express';
import { Token } from './Entity/Token';
import { Client } from './Entity/Client';
import { getManager } from 'typeorm';
import { Encryption } from './Service/Encryption';
import { Generate } from './Service/Generate';
import { randomBytes } from 'crypto';

export class Controller {
    generateClient(req: Request, res: Response): void
    {
        Generate.client().then(client => res.json(client)).catch(console.error);
    }

    generateToken(req: Request, res: Response): void
    {
        Generate.token(req.query.client_id, req.query.client_secret).then(token => res.json(token)).catch(console.error);
    };
}
