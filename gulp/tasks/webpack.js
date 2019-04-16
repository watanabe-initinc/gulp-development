import plugin from '../plugin';
import {
  webpack as webpackConfig
} from '../config';

const $ = plugin;
const env = process.env.NODE_ENV;
let webpack_config = $.webpack_config_production;
let outputDir = webpackConfig.build;

if (env === 'development') {
  webpack_config = $.webpack_config_development;
  outputDir = webpackConfig.dest;
}

export function webpack() {
  return $.gulp.src(webpackConfig.input)
    .pipe($.plumber({
      errorHandler: $.notify.onError(webpackConfig.opt.plumber)
    }))
    .pipe($.webpack_stream(webpack_config, $.webpack))
    .pipe($.gulp.dest(outputDir));
}
