export default interface ILogger {
  log: (text: string) => void;
  warn: (text: string) => void;
  error: (text: string, err: any) => void;
}

export const FILE_WRIGHT_PATH = 'src/logs/server.log';
export const FLAGS = 'a'
