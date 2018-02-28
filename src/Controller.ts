import { Request, Response } from 'express';
import { Token } from './Entity/Token';
import { getManager } from 'typeorm';

export class Controller {
    postToken(req: Request, res: Response): void
    {
        const token = new Token();
        token.client_token = 'ABC123';

        getManager().save(token).then(token => {
            res.json(token);
        }).catch(err => {
            console.error(err);
        });
    };
}
