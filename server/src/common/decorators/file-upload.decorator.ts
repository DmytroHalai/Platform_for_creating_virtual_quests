import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

export function UploadFile(fieldName: string) {
  return applyDecorators(UseInterceptors(FileInterceptor(fieldName)));
}
