import { Request, Response } from 'express';
import { Token } from './Entity/Token';
import { getManager } from 'typeorm';

export class Controller {
    postToken(req: Request, res: Response): void
    {
        const token = new Token();
        token.client_token = 'ABC123';
        token.refresh_token = 'SOMETOKEN';

        getManager().save(token).then(token => {
            res.json({
                client_token: token.client_token,
                refresh_token: token.refresh_token
            });
        }).catch(err => {
            console.error(err);
        });
    };
}
