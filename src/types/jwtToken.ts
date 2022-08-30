export default interface JwtToken {
    access_token: string;
    expires_in: number;
    token_type: string;
}
