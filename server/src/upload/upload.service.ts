import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  uploadQuestsPath,
  uploadTasksPath,
} from 'src/constants/filePath/upload';
import { v4 as uuidv4 } from 'uuid';

if (!fs.existsSync(uploadQuestsPath)) {
  fs.mkdirSync(uploadQuestsPath, { recursive: true });
}
if (!fs.existsSync(uploadTasksPath)) {
  fs.mkdirSync(uploadTasksPath, { recursive: true });
}

@Injectable()
export class UploadService {
  getStorage() {
    return diskStorage({
      destination: (req, file, callback) => {
        if (file.fieldname === 'photo') {
          callback(null, uploadQuestsPath);
        } else if (file.fieldname.startsWith('media[')) {
          callback(null, uploadTasksPath);
        } else {
          callback(new Error('Invalid file type'), uploadTasksPath);
        }
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = uuidv4();
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    });
  }
}
