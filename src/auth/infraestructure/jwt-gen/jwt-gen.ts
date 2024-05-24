import { JwtService } from "@nestjs/jwt";
import { IJwtGen } from "src/auth/application/jwt-gen/jwt-gen.interface";

export class JwtGen implements IJwtGen<string> {

    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    async genJwt(id: string): Promise<string> {
        return this.jwtService.signAsync({id})
    }

}