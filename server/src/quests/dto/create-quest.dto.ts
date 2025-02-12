import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { QuestCategory } from "src/constants/enums/questCategory";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Are you sure that you know animals?', description: 'Quest title' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://picsum.photos/seed/1/200', description: 'Quest photo' })
  photo?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'This quest is for animal lovers', description: 'Quest description' })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '20 minutes', description: 'Quest time' })
  time: string;

  @IsNotEmpty()
  @IsEnum(QuestCategory)
  @ApiProperty({ example: 'nature', description: 'Quest category' })
  category: QuestCategory;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  tasks: CreateTaskDto[];
}
