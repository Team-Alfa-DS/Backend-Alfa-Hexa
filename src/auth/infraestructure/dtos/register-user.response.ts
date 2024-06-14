import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserResponseDto {
    @ApiProperty({
        description: 'Id del usuario',
        example: 'UUID string'
    })
    id: string;
}