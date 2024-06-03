export interface IJwtGen<res> {
    genJwt(value: res): Promise<res>;
}