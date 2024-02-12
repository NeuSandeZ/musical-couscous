export class User {
  constructor(
    public tokenType: string,
    public accessToken: string,
    public expiresIn: number,
    public refreshToken: string
  ) {}
}
