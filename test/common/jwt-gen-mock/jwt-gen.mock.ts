import { JwtService } from "@nestjs/jwt";
import { IJwtGen } from "src/auth/application/jwt-gen/jwt-gen.interface";

export class JwtGenMock implements IJwtGen<string> {

    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
    }

    async genJwt(id: string): Promise<string> {
        return 'jwt code'
    }

}