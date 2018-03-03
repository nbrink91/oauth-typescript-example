import { Token } from "../Entity/Token";
import { Client } from "../Entity/Client";
import { randomBytes } from "crypto";
import { Encryption } from "./Encryption";
import { getManager } from "typeorm";

export class Generate {
    static async client(): Promise<Client>
    {
        try {
            const client = new Client();
            client.client_id = randomBytes(16).toString('hex');
            client.client_secret = randomBytes(16).toString('hex');
    
            const unencryptedClient = { ... client };
    
            await Encryption.hashClient(client);
            await getManager().save(client);
    
            return unencryptedClient;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    static async token(clientId: string, clientSecret: string): Promise<Token>
    {
        try {
            const result = await Encryption.compareSecrets(clientId, clientSecret);

            if (result === true) {
                const token = new Token();
                token.client_token = randomBytes(16).toString('hex');
                token.refresh_token = randomBytes(16).toString('hex');

                const unencryptedToken = { ... token };

                await Encryption.hashToken(token);
                await getManager().save(token);

                return unencryptedToken;
            }
            
            throw new Error();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}