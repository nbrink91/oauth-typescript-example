import { Request, Response } from 'express';
import { Token } from './Entity/Token';
import { getManager, getRepository } from 'typeorm';
import { Encryption } from './Service/Encryption';

export class Controller {
    postToken(req: Request, res: Response): void
    {
        const token = new Token();
        token.client_id = 'ABC123';
        token.client_secret = 'TopSecret123';
        token.client_token = 'NotSoSecret';
        token.refresh_token = 'SomeToken';

        res.json(token);

        Encryption.hashToken(token).then(token => {
            getManager().save(token).then(console.log).catch(console.error);
        }).catch(console.error);
    };

    validateToken(req: Request, res: Response): void
    {
        console.log(req.query);

        Encryption.compareSecrets(req.query.client_id, req.query.client_secret).then(console.log).catch(console.error);

        res.send('test');
    }
}
