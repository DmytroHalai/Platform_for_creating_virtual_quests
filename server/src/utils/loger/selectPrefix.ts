import colors from 'colors/safe';
import 'dotenv/config';

if (process.env.COLORS_ENABLED !== 'true') {
  colors.disable();
}

const selectPrefixColor = (
  prefix: string,
  colorFn: (text: string) => string,
): string => `${colorFn(prefix)}:`;

export default selectPrefixColor;
