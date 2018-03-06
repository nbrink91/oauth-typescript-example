import { randomBytes } from "crypto";
import { getManager, getRepository } from "typeorm";
import Token from "../Entity/Token";
import Client from "../Entity/Client";
import Encryption from "./Encryption";
import { compare } from "bcrypt";
import GeneratorInterface from './GeneratorInterface';
import { injectable } from "inversify";

@injectable()
export default class Generator implements GeneratorInterface {
    async client(): Promise<Client>
    {
        try {
            const client = new Client();
            client.id = randomBytes(16).toString('hex');
            client.secret = randomBytes(16).toString('hex');
    
            const unencryptedClient = { ... client };
    
            await Encryption.hashClient(client);
            await getManager().save(client);
    
            return unencryptedClient;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async token(clientId: string, clientSecret: string): Promise<Token>
    {
        try {
            const client = await getRepository(Client).findOne({id: clientId});

            if (typeof client === 'undefined') {
                throw new Error();
            }

            const result = await compare(clientSecret, client.secret);

            if (false === result) {
                throw new Error();
            }

            const token = new Token();
            token.client = client;
            token.accessToken = randomBytes(16).toString('hex');
            token.refreshToken = randomBytes(16).toString('hex');

            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);
            token.expiration = expiration;

            const unencryptedToken = { ... token };

            await Encryption.hashToken(token);
            await getManager().save(token);

            return unencryptedToken;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}