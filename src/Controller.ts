import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { randomBytes } from 'crypto';
import { injectable, inject } from 'inversify';

import Token from './Entity/Token';
import TokenResponse from './Model/TokenResponse'
import Client from './Entity/Client';
import Generator from './Service/Generator';

@injectable()
export default class Controller {
    constructor(
        @inject(Generator) public generator: Generator
    ) { }

    statusCheck(req: Request, res: Response): void
    {
        res.send('Success');
    }

    postToken(req: Request, res: Response): void
    {
        this.generator.token(req.query.client_id, req.query.client_secret).then(token => {
            const tokenResponse = new TokenResponse(token.accessToken, 3600, 'bearer');

            res.json(tokenResponse);
        }).catch(console.error);
    };
}
