import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/getUser';
import { IUser } from 'src/constants/types/user/user';

@Controller('quests')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post(':id/rating')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createRatingDto: CreateRatingDto,
    @GetUser() user_id: IUser,
    @Param('id') quest_id: string,
  ) {
    return this.ratingService.create(createRatingDto, +user_id, +quest_id);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
