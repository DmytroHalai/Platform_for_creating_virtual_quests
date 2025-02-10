import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Response,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/getUser';
import { IUser } from 'src/constants/types/user/user';
import { UploadService } from 'src/upload/upload.service';
import { TasksService } from 'src/tasks/tasks.service';


@Controller('quests')
export class QuestsController {
  constructor(
    private readonly questsService: QuestsService,
    private readonly tasksService: TasksService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: new UploadService().getStorage(),
    }),
  )
  async create(
    @Body() createQuestDto: CreateQuestDto,
    @GetUser() id: IUser,
    @Response() res,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const photoFiles =
      files?.filter((file) => file.fieldname === 'photo') || [];
    const mediaFiles =
      files?.filter((file) => file.fieldname.startsWith('media')) || [];

    if (typeof createQuestDto.tasks === 'string') {
      createQuestDto.tasks = JSON.parse(createQuestDto.tasks);
    }

    const quest = await this.questsService.create(
      createQuestDto,
      +id,
      photoFiles.length > 0 ? photoFiles[0] : undefined,
    );

    const sortedMedia = mediaFiles.sort((a, b) => {
      const indexA = a.fieldname.match(/\[(\d+)\]/)?.[1] ?? '0';
      const indexB = b.fieldname.match(/\[(\d+)\]/)?.[1] ?? '0';
      return Number(indexA) - Number(indexB);
    });

    await this.tasksService.create(
      createQuestDto.tasks,
      quest.quest_id,
      sortedMedia,
    );

    return res.send({ quest });
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

  @Get(':id')
  async findQuest(@Param('id') id: string, @Response() res) {
    const quest = await this.questsService.findById(+id);
    return res.send({ quest });
  }
}
