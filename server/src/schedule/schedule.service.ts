import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SCHEDULE } from 'src/constants/enums/scheduleConfig';
import { UsersService } from 'src/users/users.service';

import logger from '../utils/loger/loger';
const { log } = logger('user-cleanup');

@Injectable()
export class ScheduleService {
  constructor(private readonly userRepository: UsersService) {}

  @Cron(SCHEDULE.DELETE_UNCONFIRMED_USERS)
  async deleteUnconfirmedUsers() {
    const usersToDelete = await this.userRepository.findOverdue();
    if (usersToDelete.length) {
      await this.userRepository.removeOverdue(usersToDelete);
      log(`Deleted ${usersToDelete.length} unconfirmed users.`);
    }
  }
}
