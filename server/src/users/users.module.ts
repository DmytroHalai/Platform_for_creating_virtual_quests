import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './users.providers';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { CookieModule } from 'src/cookie/cookie.module';
import { EmailModule } from 'src/email/email.module';
import { UploadModule } from 'src/upload/upload.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [
    DatabaseModule,
    CookieModule,
    EmailModule,
    UploadModule,
    FileUploadModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_TOKEN_LIFE_TIME },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
