import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { diskStorage } from "multer";
import { extname } from "path";
import { PATH } from "src/constants/enums/filePath";

import { v4 as uuidv4 } from "uuid";

if (!fs.existsSync(PATH.UPLOAD_QUEST)) {
  fs.mkdirSync(PATH.UPLOAD_QUEST, { recursive: true });
}
if (!fs.existsSync(PATH.UPLOAD_TASK)) {
  fs.mkdirSync(PATH.UPLOAD_TASK, { recursive: true });
}

if (!fs.existsSync(PATH.UPLOAD_AVATAR)) {
  fs.mkdirSync(PATH.UPLOAD_AVATAR, { recursive: true });
}

@Injectable()
export class UploadService {
  getStorage() {
    return diskStorage({
      destination: (req, file, callback) => {
        if (file.fieldname === "photo") {
          callback(null, PATH.UPLOAD_QUEST);
        } else if (file.fieldname.startsWith("media[")) {
          callback(null, PATH.UPLOAD_TASK);
        } else if (file.fieldname === "avatar") {
          callback(null, PATH.UPLOAD_AVATAR);
        } else {
          callback(new Error("Invalid file type"), PATH.UPLOAD_TASK);
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
