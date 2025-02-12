import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ example: '5', description: 'Quest rating' })
  rating: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'That is such a beautiful quest!', description: 'Quest comment' })
  comment?: string;
}
