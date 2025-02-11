import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
