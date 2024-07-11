import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    category: string;

    @IsString()
    level: string;

    @IsNumber()
    weeks: number;

    @IsNumber()
    duration: number;

    @IsArray()
    tags: string[];

    @IsString()
    trainer: string;
}