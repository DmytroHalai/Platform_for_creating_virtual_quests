import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { writeFile, mkdir } from "fs/promises";
import { join, extname } from "path";
import { UPLOAD, UPLOADS_DIR } from "src/constants/dirNames/dirname";
import { FOLDERS } from "src/constants/enums/uploadFolders";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class FileUploadService {
  private readonly uploadFolder = join(__dirname, UPLOADS_DIR);

  private getUploadPath(type: string) {
    return FOLDERS[type] || FOLDERS.other;
  }

  async saveFile(file: Express.Multer.File, type: string) {
    if (!file) throw new BadRequestException("File exist");

    const subfolder = this.getUploadPath(type);
    const folderPath = join(this.uploadFolder, subfolder);
    const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
    const filePath = join(folderPath, uniqueName);

    try {
      await mkdir(folderPath, { recursive: true });
      await writeFile(filePath, file.buffer);
      return `${UPLOAD}/${subfolder}/${uniqueName}`;
    } catch (error) {
      throw new InternalServerErrorException("Error during save");
    }
  }
}
