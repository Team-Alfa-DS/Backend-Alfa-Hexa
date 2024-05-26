export interface IEncryptor {
    hash(password: string): Promise<string>;
    comparePassword(password: string, hashPassword: string): Promise<boolean>;
}