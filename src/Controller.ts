import { Request, Response } from 'express';
import { Token } from './Entity/Token';
import { Client } from './Entity/Client';
import { getManager } from 'typeorm';
import { Encryption } from './Service/Encryption';
import { randomBytes } from 'crypto';

export class Controller {
    generateClient(req: Request, res: Response): void
    {
        const client = new Client();
        client.client_id = randomBytes(16).toString('hex');
        client.client_secret = randomBytes(16).toString('hex');

        const unencryptedClient = { ... client };

        Encryption.hashClient(client).then(client =>
            getManager().save(client).then(() =>
                res.json(unencryptedClient)
            ).catch(console.error)
        ).catch(console.error);
    }

    generateToken(req: Request, res: Response): void
    {
        Encryption.compareSecrets(req.query.client_id, req.query.client_secret).then(result => {
            if (result === true) {
                const token = new Token();
                token.client_token = randomBytes(16).toString('hex');
                token.refresh_token = randomBytes(16).toString('hex');

                const unencryptedToken = { ... token };

                Encryption.hashToken(token).then(token => {
                    getManager().save(token).then(() => {
                        res.json(unencryptedToken);
                    }).catch(console.error);
                }).catch(console.error);
            }
            // TODO: Handle failed compare.
        }).catch(console.error);
    };
}
