import { Winston } from 'winston';
import { Token } from '../Entity/Token';
import { genSalt, hash, compare } from 'bcrypt';
import { getRepository } from 'typeorm';


export class Encryption {
    static async hashToken(token: Token): Promise<Token>
    {
        token.client_secret = await hash(token.client_secret, 10)

        return token;
    }

    static async compareSecrets(client_id: string, client_secret: string): Promise<boolean>
    {
        const token = await getRepository(Token).findOne({client_id: client_id});

        return await compare(client_secret, token.client_secret);
    }
}