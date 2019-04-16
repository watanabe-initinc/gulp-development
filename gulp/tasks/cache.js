import plugin from '../plugin';
import {
  cache as cacheConfig
} from '../config';

const $ = plugin;
const env = process.env.NODE_ENV;
let outputDir = cacheConfig.build;

if (env === 'development') {
  outputDir = cacheConfig.dest;
}

export function cache_bust() {
  return $.gulp
    .src(cacheConfig.input)
    .pipe($.cache_bust({
      type: cacheConfig.opt.type
    }))
    .pipe($.gulp.dest(outputDir));
}
