import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { randomBytes } from 'crypto';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";

import Token from './Entity/Token';
import TokenResponse from './Model/TokenResponse'
import Client from './Entity/Client';
import GeneratorInterface from './Service/GeneratorInterface';

@injectable()
class Controller {
     public generator: GeneratorInterface;

    constructor(
        @inject("Generator") generator: GeneratorInterface
    ) {
        this.generator = generator;
    }

    statusCheck(req: Request, res: Response): void
    {
        res.send('Success');
    }

    postToken(req: Request, res: Response): void
    {
        console.log(this);
        this.generator.token(req.query.client_id, req.query.client_secret).then(token => {
            const tokenResponse = new TokenResponse(token.accessToken, 3600, 'bearer');

            res.json(tokenResponse);
        }).catch(console.error);
    };
}

export default Controller;