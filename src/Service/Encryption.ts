import { Winston } from 'winston';
import { Token } from '../Entity/Token';
import { genSalt, hash, compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import { Client } from '../Entity/Client';

export class Encryption {
    static async hashClient(client: Client): Promise<Client>
    {
        const saltRounds = 12;
        client.client_secret = await hash(client.client_secret, saltRounds);

        return client;
    }

    static async hashToken(token: Token): Promise<Token>
    {
        const saltRounds = 12;
        token.refresh_token = await hash(token.refresh_token, saltRounds);

        return token;
    }

    static async compareSecrets(client_id: string, client_secret: string): Promise<boolean>
    {
        const client = await getRepository(Client).findOne({client_id: client_id});

        return await compare(client_secret, client.client_secret);
    }
}