import plugin from '../plugin';
import {
  copy as copyConfig
} from '../config';

const $ = plugin;
const env = process.env.NODE_ENV;
let outputDir = copyConfig.build;

if (env === 'development') {
  outputDir = copyConfig.dest;
}

export function copy() {
  return $.gulp
    .src([copyConfig.input, copyConfig.reject], {
      base: copyConfig.src
    })
    .pipe($.gulp.dest(outputDir));
}
