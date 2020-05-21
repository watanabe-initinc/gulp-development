import plugin from "../plugin";
import { image_min as imgminConfig } from "../config";

const $ = plugin;
const env = process.env.NODE_ENV;
let outputDir = imgminConfig.build;

if (env === "development") {
  outputDir = imgminConfig.dest;
}

export function image_min() {
  return $.gulp
    .src(imgminConfig.input)
    .pipe(
      $.image_min(
        [
          $.image_min.gifsicle({
            interlaced: true,
          }),
          $.image_min.mozjpeg({
            quality: 75,
            progressive: true,
          }),
          $.image_min.optipng({
            optimizationLevel: 7,
          }),
          $.image_min.svgo({
            plugins: [
              {
                removeViewBox: true,
              },
              {
                cleanupIDs: false,
              },
            ],
          }),
        ],
        {
          verbose: true,
        }
      )
    )
    .pipe($.gulp.dest(outputDir));
}
