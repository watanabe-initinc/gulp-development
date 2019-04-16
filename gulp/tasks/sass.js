import plugin from '../plugin';
import {
  sass as sassConfig
} from '../config';

const $ = plugin;
const env = process.env.NODE_ENV;
let outputDir = sassConfig.build;

if (env === 'development') {
  outputDir = sassConfig.dest;
}

export function sass() {
  if (env === 'development') {
    return $.gulp.src([sassConfig.input, sassConfig.reject])
      .pipe($.plumber({
        errorHandler: $.notify.onError(sassConfig.opt.plumber)
      }))
      .pipe($.sourcemaps.init())
      .pipe($.csscomb())
      .pipe($.sass())
      .pipe($.cleanCss())
      .pipe($.prefixer(sassConfig.opt.prefixer))
      .pipe($.sourcemaps.write(sassConfig.root))
      .pipe($.gulp.dest(outputDir));
  } else {
    return $.gulp.src([sassConfig.input, sassConfig.reject])
      .pipe($.plumber({
        errorHandler: $.notify.onError(sassConfig.opt.plumber)
      }))
      .pipe($.sourcemaps.init())
      .pipe($.csscomb())
      .pipe($.sass())
      .pipe($.cleanCss())
      .pipe($.prefixer(sassConfig.opt.prefixer))
      .pipe($.gulp.dest(outputDir));
  }

}
