import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class MarkEndProgressDto {
    @IsString()
    @IsUUID()
    courseId: string;

    @IsString()
    @IsUUID()
    lessonId: string;

    @IsBoolean()
    markAsCompleted: boolean;

    @IsNumber()
    @IsOptional()
    time?: number //segundos
}