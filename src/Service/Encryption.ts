import { Winston } from 'winston'
import { genSalt, hash, compare } from 'bcrypt';
import { getRepository } from 'typeorm';

import Client from '../Entity/Client';
import Token from '../Entity/Token';
import EncryptionInterface from './EncryptionInterface';

export default class Encryption {
    static async hashClient(client: Client): Promise<Client>
    {
        const saltRounds = 12;
        client.secret = await hash(client.secret, saltRounds);

        return client;
    }

    static async hashToken(token: Token): Promise<Token>
    {
        const saltRounds = 12;
        token.refreshToken = await hash(token.refreshToken, saltRounds);

        return token;
    }
}