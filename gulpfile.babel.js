// **********************************************
// import
// **********************************************

import { series, parallel, task, watch } from 'gulp';

import { ejs } from './gulp/tasks/ejs';
import { sass } from './gulp/tasks/sass';
import { webpack } from './gulp/tasks/webpack';
import { copy } from './gulp/tasks/copy';
import { clean } from './gulp/tasks/clean';
import { image_min } from './gulp/tasks/image_min';
import { cache_bust } from './gulp/tasks/cache';
import { browser_sync, bs_reload } from './gulp/tasks/browser_sync';

import {
  copy as copyConfig,
  ejs as ejsConfig,
  sass as sassConfig,
  webpack as webpackConfig,
  image_min as imgminConfig
  // cache as cacheConfig
} from './gulp/config';

// **********************************************
// task set
// **********************************************

task('clean', clean);
task('copy', copy);
task('ejs', ejs);
task('sass', sass);
task('webpack', webpack);
task('image_min', image_min);
task('cache_bust', cache_bust);

// **********************************************
// watch task
// **********************************************

function watchFiles() {
  watch(copyConfig.input, series(copy, bs_reload));
  watch(ejsConfig.input, series(ejs, bs_reload));
  watch(sassConfig.input, series(sass, bs_reload));
  watch(webpackConfig.input, series(webpack, bs_reload));
  watch(imgminConfig.input, series(image_min, bs_reload));
  // watch(cacheConfig.input, series(cache_bust, bs_reload));
}

task(
  'dev',
  series(
    clean,
    parallel(ejs, sass, webpack, image_min),
    copy,
    browser_sync,
    watchFiles
  )
);

task('build', series(clean, parallel(ejs, sass, webpack, image_min), copy));
