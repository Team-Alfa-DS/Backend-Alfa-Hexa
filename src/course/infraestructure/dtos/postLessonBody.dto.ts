import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class PostLesonBodyDto {
  @ApiProperty({
    description: "",
    example: ""
  })
  @IsString()
  courseId: string;

  @ApiProperty({
    description: "",
    example: ""
  })
  @IsString()
  title: string;
  
  @ApiProperty({
    description: "",
    example: ""
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: "",
    example: ""
  })
  @IsNumber()
  seconds: number;
}