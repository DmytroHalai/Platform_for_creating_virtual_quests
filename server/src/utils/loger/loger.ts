'use strict';

import colors from 'colors/safe';
import writeFileLogger from './writeFileLogger';
import selectPrefixColor from './selectPrefix';
import ILogger from 'src/constants/types/logger/logger';

const createLogger = (prefix: string): ILogger => {
  return {
    log: (text: string) => {
      const logInfo = selectPrefixColor(prefix, colors.green);
      writeFileLogger(logInfo, text);
      console.log(logInfo, text);
    },

    warn: (text: string) => {
      const warnInfo = selectPrefixColor(prefix, colors.red);
      writeFileLogger(warnInfo, text);
      console.error(warnInfo, text);
    },

    error: (text: string, err: any) => {
      const errorInfo = selectPrefixColor(prefix, colors.red);
      writeFileLogger(errorInfo, text);
      console.error(errorInfo, text, err);
    },
  };
};

export default createLogger;
