import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const maxSize = 1000000;
    if (file.size > maxSize) {
      throw new BadRequestException(
        `Размер файла должен быть меньше ${maxSize} байт`,
      );
    }
    return file;
  }
}
