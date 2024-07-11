import { IEncryptor } from "src/auth/application/encryptor/encryptor.interface";

export class EncryptMock implements IEncryptor {

    hash(password: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return password === hashPassword;
    }

}