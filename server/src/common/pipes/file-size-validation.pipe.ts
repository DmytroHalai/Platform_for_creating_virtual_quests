import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { MAX_SIZE } from "src/constants/uploadsSize/size";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const maxSize = MAX_SIZE;
    if (file.size > maxSize) {
      throw new BadRequestException(
        `File size must be less than ${maxSize} bytes`
      );
    }
    return file;
  }
}
