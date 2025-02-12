import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: 5, description: "Rating number" })
  rating: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "That is such an amazing quest",
    description: "Rating comment",
  })
  comment?: string;
}
