import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Post()
  create(@Body() createQuestDto: CreateQuestDto, @Request() req) {
    const userId = req.user.user_id;
    return this.questsService.create(createQuestDto, userId);
  }

  @Get()
  findAll() {
    return this.questsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestDto: UpdateQuestDto) {
    return this.questsService.update(+id, updateQuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questsService.remove(+id);
  }
}
