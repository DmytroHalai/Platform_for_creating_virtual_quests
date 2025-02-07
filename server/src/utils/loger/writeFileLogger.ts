import { createWriteStream } from 'fs';
import { FILE_WRIGHT_PATH, FLAGS } from 'src/constants/types/logger/logger';

const writeStream = createWriteStream(FILE_WRIGHT_PATH, {
  flags: FLAGS,
});

writeStream.on('error', (err: any): void => {
  console.error('Write File Error', err.message);
});
const writeFileLogger = (prefix: string, text: string): void => {
  const logMessage = `${prefix} ${text}\n`;
  writeStream.write(logMessage);
};

export default writeFileLogger;
