import { FileValidator } from '@nestjs/common';

export class FileTypeValidator extends FileValidator<{ fileType: string }> {
  isValid(file: Express.Multer.File): boolean {
    return file.mimetype === this.validationOptions.fileType;
  }

  buildErrorMessage(): string {
    return `Файл должен быть типа ${this.validationOptions.fileType}`;
  }
}
