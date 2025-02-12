import { Controller, Post, Body, Param, UseGuards } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { IUser } from "src/constants/types/user/user";
import { ApiDoc } from "src/common/decorators/api-doc.decorator";
import {ApiProperty} from "@nestjs/swagger";

@Controller("quests")
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post(":id/rating")
  @UseGuards(JwtAuthGuard)
  @ApiProperty({ example: '5', description: 'Quest rate' })
  @ApiDoc("Rate a quest", 201, "Rating added successfully", true)
  create(
    @Body() createRatingDto: CreateRatingDto,
    @GetUser() user_id: IUser,
    @Param("id") quest_id: string
  ) {
    return this.ratingService.create(createRatingDto, +user_id, +quest_id);
  }
}
