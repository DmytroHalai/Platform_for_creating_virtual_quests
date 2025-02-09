import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/getUser';
import { IUser } from 'src/constants/types/user/user';
import { UploadService } from 'src/upload/upload.service';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('quests')
export class QuestsController {
  constructor(
    private readonly questsService: QuestsService,
    private readonly taskService: TasksService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: new UploadService().getStorage(),
    }),
  )
  async create(
    @Body() createQuestDto: CreateQuestDto,
    @GetUser() id: IUser,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const photoFiles = files.filter((file) => file.fieldname === 'photo');
    const mediaFiles = files.filter((file) =>
      file.fieldname.startsWith('media'),
    );

    if (typeof createQuestDto.tasks === 'string') {
      createQuestDto.tasks = JSON.parse(createQuestDto.tasks);
    }

    const quest = await this.questsService.create(
      createQuestDto,
      +id,
      photoFiles && photoFiles[0] ? photoFiles[0] : undefined,
    );

    if (photoFiles && photoFiles[0]) {
      quest.photo = `/uploads/quests/${photoFiles[0].filename}`;
      this.questsService.update(quest.quest_id, { photo: quest.photo });
    }

    const sortedMedia = mediaFiles.sort((a, b) => {
      const indexA = a.fieldname.match(/\[(\d+)\]/)?.[1] ?? '0';
      const indexB = b.fieldname.match(/\[(\d+)\]/)?.[1] ?? '0';
      return Number(indexA) - Number(indexB);
    });

    await this.taskService.create(
      createQuestDto.tasks,
      quest.quest_id,
      sortedMedia,
    );

    return { quest };
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
