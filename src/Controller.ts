import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, httpPost, request, queryParam, response, requestParam } from "inversify-express-utils";

import Token from './Entity/Token';
import TokenResponse from './Model/TokenResponse'
import Client from './Entity/Client';
import GeneratorInterface from './Service/GeneratorInterface';

@controller('/v2/oauth')
export default class Controller {
     public generator: GeneratorInterface;

    constructor(
        @inject("Generator") generator: GeneratorInterface
    ) {
        this.generator = generator;
    }

    @httpGet('/')
    statusCheck(req: Request, res: Response): void
    {
        res.send('Success');
    }

    @httpPost('/token')
    async postToken(
        @queryParam("grant_type") grantType: string,
        @queryParam("client_id") clientId: string,
        @queryParam("client_secret") clientSecret: string,
        @response() res: Response
    ) {
        try {
            const token = await this.generator.token(clientId, clientSecret)
            const tokenResponse = new TokenResponse(token.accessToken, 3600, 'bearer');
            res.json(tokenResponse);
        } catch (e) {
            res.status(500).json(e);
        }
    };
}
