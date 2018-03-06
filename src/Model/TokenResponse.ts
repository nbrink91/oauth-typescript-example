export default class TokenResponse {
    constructor(
        public access_token: string,
        public expires_in: number,
        public token_type: string,
        public refresh_token?: string,
        public scope?: string,
    ) { }
}
