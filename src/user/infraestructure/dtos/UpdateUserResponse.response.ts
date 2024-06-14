import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserResponseDto {
    @ApiProperty({
        description: 'Id del usuario',
        example: 'UUID string'
    })
    id: string;
}