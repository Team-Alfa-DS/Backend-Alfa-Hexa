import { IsIn, IsString, IsUUID, MinLength } from "class-validator";

export class AddCommentEntryDto {

    @IsString()
    @IsUUID()
    target: string; 

    @IsString()
    @IsIn(['LESSON','BLOG'])
    targetType: string;

    @IsString()
    @MinLength(1)
    body: string;
}