import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNumber, IsString } from "class-validator";

export class PostCourseBodyDto {
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
  description: string;

  @ApiProperty({
    description: "",
    example: ""
  })
  @IsString()
  imageUrl: string;

  // @ApiProperty({
  //   description: "",
  //   example: ""
  // })
  // @IsDate()
  // date: Date;
  
  // durationMinutes: number;
  
  @ApiProperty({
    description: "",
    example: ""
  })
  @IsNumber()
  durationWeeks: number;

  @ApiProperty({
    description: "",
    example: ""
  })
  @IsString()
  level: string;

  @ApiProperty({
    description: "",
    example: ""
  })
  @IsArray()
  @IsString({each: true})
  tags: string[];

  @ApiProperty({
    description: "",
    example: ""
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    description: "",
    example: ""
  })
  @IsString()
  trainerId: string;
}