import { IsString } from "class-validator";

export class CreateTrainerDto {
    @IsString()
    name: string;

    @IsString()
    location: string;
}