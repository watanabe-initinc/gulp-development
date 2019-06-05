import plugin from '../plugin';
import { ejs as ejsConfig } from '../config';

const $ = plugin;
const env = process.env.NODE_ENV;
const revision = $.crypto.randomBytes(8).toString('hex');
let outputDir = ejsConfig.build;

if (env === 'development') {
  outputDir = ejsConfig.dest;
}

export function ejs() {
  const json = JSON.parse(
    $.fs.readFileSync(ejsConfig.metadata, {
      encoding: 'utf-8'
    })
  );
  return $.gulp
    .src([ejsConfig.input, ejsConfig.reject], {
      base: ejsConfig.src
    })
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError(ejsConfig.opt.plumber)
      })
    )
    .pipe(
      $.ejs(
        {
          json: json
        },
        {},
        ejsConfig.opt.extension
      )
    )
    .pipe(
      $.replace(/\.(js|css|gif|jpg|jpeg|png|svg)\?rev/g, '.$1?rev=' + revision)
    )
    .pipe($.htmlHint(ejsConfig.opt.htmlHint))
    .pipe($.htmlHint.failReporter())
    .pipe($.gulp.dest(outputDir));
}
