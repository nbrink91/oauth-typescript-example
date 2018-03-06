import GeneratorInterface from './GeneratorInterface';
import Client from '../Entity/Client';
import Token from '../Entity/Token';
import { injectable } from 'inversify';

@injectable()
export default class GeneratorMock implements GeneratorInterface {
    async client(): Promise<Client> {
        const client = new Client();
        client.id = 'MOCKCLIENTID';
        client.secret = 'MOCKCLIENTSECRET';
        client.created = new Date();

        return Promise.resolve(client);
    };

    async token(clientId: string, clientSecret: string): Promise<Token> {
        const token = new Token();
        token.id = 1;
        token.accessToken = "MOCKACCESSTOKEN";
        token.refreshToken = "MOCKREFRESHTOKEN";
        token.created = new Date();
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        token.expiration = expiration;
        token.client.id = clientId;
        token.client.secret = "MOCKCLIENTSECRET";
        token.client.created = new Date();
    
        return Promise.resolve(token);
    };
}