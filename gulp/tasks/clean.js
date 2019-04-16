import {
  clean as cleanConfig
} from '../config';

const del = require('del');
const env = process.env.NODE_ENV;
let outputDir = cleanConfig.build;

if (env === 'development') {
  outputDir = cleanConfig.dest;
}

export function clean() {
  return del([outputDir]);
}
