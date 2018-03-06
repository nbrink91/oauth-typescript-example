import Client from "../Entity/Client";
import Token from "../Entity/Token";

export default interface EncryptionInterface {
    hashClient(client: Client): Promise<Client>;
    hashToken(token: Token): Promise<Token>;
}