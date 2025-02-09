import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Response,
} from '@nestjs/common';
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/getUser';
import { IUser } from 'src/constants/types/user/user';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuestDto: CreateQuestDto, @GetUser() id: IUser) {
    return this.questsService.create(createQuestDto, +id);
  }

  @Get('count')
  async countAll(@Response() res) {
    const questsCount = await this.questsService.countAll();
    return res.send({ questsCount });
  }

  @Get()
  async findAll(@Response() res) {
    const quests = await this.questsService.findAll();
    return res.send({ quests });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQuestDto: UpdateQuestDto) {
  //   return this.questsService.update(+id, updateQuestDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.questsService.remove(+id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('all')
  // findAll(@GetUser() id: IUser) {
  //   return this.questsService.findAllByAuthor(+id);
  // }
}
