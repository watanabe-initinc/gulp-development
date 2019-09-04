const BASE = {
  ROOT: './',
  SRC: './src',
  DEST: './dest',
  BUILD: './build',
  ASSETS: 'assets',
  TASKS: './tasks'
};

export const srcDir = BASE.SRC;
export const destDir = BASE.DEST;

export const clean = {
  name: 'del',
  dest: BASE.DEST,
  build: BASE.BUILD
};

export const copy = {
  name: 'copy',
  src: BASE.SRC,
  input: [
    BASE.SRC,
    '**',
    '*.{pdf,xls,xlsx,css,ico,svg,eot,ttf,woff,woff2}'
  ].join('/'),
  reject: `!${[
    BASE.SRC,
    '**',
    '*.{sass,scss,ejs,jsx,html,js,es6,jpg,gif,png}'
  ].join('/')}`,
  dest: BASE.DEST,
  build: BASE.BUILD
};

export const image_min = {
  name: 'image_min',
  src: BASE.SRC,
  input: [BASE.SRC, '**', '*.{jpg,gif,png}'].join('/'),
  dest: BASE.DEST,
  build: BASE.BUILD
};

export const ejs = {
  name: 'ejs',
  src: BASE.SRC,
  metadata: [BASE.SRC, '_data/', 'meta.json'].join('/'),
  input: [BASE.SRC, '**', '*.{html,ejs}'].join('/'),
  reject: `!${[BASE.SRC, '**', '_*.ejs'].join('/')}`,
  dest: BASE.DEST,
  build: BASE.BUILD,
  opt: {
    plumber: {
      message: 'Error: HTML syntax error \n <%= error.message %>',
      icon: './.icon/notify-icon.png'
    },
    htmlHint: {
      'tagname-lowercase': true,
      'attr-lowercase': true,
      'attr-value-double-quotes': true,
      'doctype-first': true,
      'tag-pair': true,
      'spec-char-escape': true,
      'id-unique': true,
      'src-not-empty': true,
      'attr-no-duplication': true,
      'title-require': true,
      'doctype-html5': true,
      'space-tab-mixed-disabled': 'space'
    }
  }
};

export const browser_sync = {
  ghostMode: false,
  notify: false,
  domain: '127.0.0.1',
  port: 6504,
  ui: {
    port: 6505
  },
  server: {
    baseDir: BASE.DEST
  }
};

export const sass = {
  name: 'sass',
  root: BASE.ROOT,
  src: BASE.SRC,
  input: [BASE.SRC, '**', 'scss', '**', '*.{sass,scss}'].join('/'),
  reject: `!${[BASE.SRC, '**', 'scss', '**', '_*.{sass,scss}'].join('/')}`,
  dest: BASE.DEST,
  build: BASE.BUILD,
  opt: {
    plumber: {
      message: 'Error: SASS syntax error \n <%= error.message %>',
      icon: './gulp/.icon/notify-icon.png'
    },
    output: 'expanded',
    prefixer: {
      browsers: ['last 2 versions'],
      cascade: false
    }
  }
};

export const cache = {
  name: 'cache',
  root: BASE.ROOT,
  input: [BASE.DEST, '**', '*.html'].join('/'),
  dest: BASE.DEST,
  build: BASE.BUILD,
  opt: {
    type: 'timestamp'
  }
};

export const webpack = {
  name: 'webpack',
  root: BASE.ROOT,
  src: BASE.SRC,
  input: [BASE.SRC, '**', 'js', '**', '*.{es6,js}'].join('/'),
  dest: BASE.DEST,
  build: BASE.BUILD,
  opt: {
    plumber: {
      message: 'Error: Javascript error \n <%= error.message %>',
      icon: './.icon/notify-icon.png'
    }
  }
};
