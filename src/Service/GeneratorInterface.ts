import Client from "../Entity/Client";
import Token from "../Entity/Token";

export default interface Generator {
    client(): Promise<Client>;

    token(clientId: string, clientSecret: string): Promise<Token>;
}
