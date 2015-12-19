'use strict';

/**
 * load plugins
*/
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'gulp.spritesmith',
    'browser-sync',
    'run-sequence'
  ]
});

/**
 * Config
*/
var config = {
  src: 'src/',
  dist: 'html/',
  browserSupport: ['last 3 versions', 'ie >= 9', 'android >= 4'],
  sprite: {
    src: 'src/img/common/sprite/',// Sprite画像読み込み先
    distSCSS: 'src/scss_sprite/',
    distImg: 'html/assets/img/common/sprite/', // Sprite画像出力先
    maps: [
    'header'
    ]
    //Sprite画像の名前リスト（sprite-xxx.png）
  }
};

//Sprite
gulp.task('sprite:dev', function() {
  var spriteMaps = config.sprite.maps;
  for(var i = 0; i < spriteMaps.length; i++) {
    var spriteName = config.sprite.maps[i];
    var spriteData = gulp.src(config.sprite.src + '*.png')
      .pipe(spritesmith({
        imgName: 'sprite-' +  spriteName + '.png',
        imgPath: '../img/common/sprite/sprite-' +  spriteName + '.png',
        cssName: '_' + spriteName + '.scss',
        algorithm: 'binary-tree',
        // algorithm:'left-right',
        padding: 2,
        cssTemplate: config.src + '/sprite/scss.template.mustache'
      }));
    spriteData.img.pipe(gulp.dest(config.sprite.distImg));
    spriteData.css.pipe(gulp.dest(config.sprite.distSCSS));
  }
});

gulp.task('sprite_sp', function() {
  var spriteMaps = config.sprite.maps;
  for(var i = 0; i < spriteMaps.length; i++) {
    var spriteName = config.sprite.maps[i];
    var spriteData = gulp.src('src/img-sp/common/sprite/*.png') //スプライトにする画像
      .pipe(spritesmith({
        imgName: 'sprite-' +  spriteName + '.png',
        imgPath: '../img/common/sprite/sprite-' +  spriteName + '.png', //生成されるCSSに記載されるパス
        cssName: '_' + spriteName + '.scss',
        algorithm: 'binary-tree',
        padding: 2,
        cssTemplate: config.src + '/sprite/scss.template.mustache'
      }));
    spriteData.img.pipe(gulp.dest('html/assets-sp/img/common/sprite/'));
    spriteData.css.pipe(gulp.dest('src/scss_sprite_sp/'));
  }
});


// Server & BrowserSync
gulp.task('bs:dev', function() {
  $.browserSync({
    baseDir: "./html/",
    proxy: "punchandsons.localhost" // 任意のローカルホストを記載
  });
});

// SCSS
gulp.task('scss_pc:dev', function() {
  return gulp.src(config.src + 'scss_pc/{**/,}*.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: config.browserSupport
    }))
    .pipe(gulp.dest(config.dist + 'assets/css/'))
    .pipe($.browserSync.stream());

});

gulp.task('scss_sp:dev', function() {
  return gulp.src(config.src + 'scss_sp/{**/,}*.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: config.browserSupport
    }))
    .pipe(gulp.dest(config.dist + 'assets-sp/css/'))
    .pipe($.browserSync.stream());
});

// JS
gulp.task('jsVender', function() {
  return gulp.src(config.src + 'js/vender/*.js')
    .pipe($.concat('vender.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.dist + 'assets/js/'))
});

gulp.task('js:dev', function() {
  return gulp.src(config.src + 'js/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist + 'assets/js/'))
    .pipe($.browserSync.stream());
});

gulp.task('js:release', function() {
  return gulp.src(config.src + 'js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(config.dist + 'assets/js/'))
});



// 画像圧縮処理
gulp.task('imagemin', function() {
  var srcGlob = './src/img' + '/**/*.+(jpg|jpeg|png|gif|svg)';
  var dstGlob = './html/assets/img';
  var imageminOptions = {
    optimizationLevel: 7
  };
  gulp.src( srcGlob )
    .pipe(imagemin( imageminOptions ))
    .pipe(gulp.dest( dstGlob ));
});


gulp.task('watch:dev', function() {
 gulp.watch(
    config.src + 'scss_pc/{**/,}*.scss',
    ['scss_pc:dev']
  );
  gulp.watch(
    config.src + 'scss_sp/{**/,}*.scss',
    ['scss_sp:dev']
  );
  gulp.watch(
    config.src + 'js/*.js',
    ['js:dev']
  );
   gulp.watch(
  'src/img/common/sprite/*.png',
    ['sprite']
  );
  gulp.watch([config.dist + '{**/,}*.html', config.dist + '*.php'])
    .on("change", $.browserSync.reload);
});

// CSS
gulp.task('default', function() {
  $.runSequence(
    ['jsVender'],
     ['scss_pc:dev', 'scss_sp:dev'],
    'js:dev',
    'bs:dev',
    'watch:dev'
  );  
});

// Sprite
gulp.task('sprite', function() {
  $.runSequence(
    'sprite:dev',
    'sprite_sp'
  );
});

// Release
// gulp.task('release', function() {
//   $.runSequence(
//     'cssSprite',
//     'scss:release',
//     'jsVender',
//     'js:release'
//   );

// });