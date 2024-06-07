import { IEncryptor } from "src/auth/application/encryptor/encryptor.interface";
import * as bcrypt from 'bcrypt';

export class BcryptEncryptor implements IEncryptor {

    hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }

}