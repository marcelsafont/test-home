const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  browserSync = require('browser-sync').create(),
	  autoprefixer = require('gulp-autoprefixer'),
	  sourcemaps = require('gulp-sourcemaps'),
	  babel = require('gulp-babel'),
	  rename = require('gulp-rename'),
	  imagemin = require('gulp-imagemin'),
	  webp = require('imagemin-webp'),
	  pngquant = require('imagemin-pngquant'),
	  mozjpeg = require('imagemin-mozjpeg');

//compile scss to css
function css(){
	return gulp.src('./src/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'compressed',
	}))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(autoprefixer('last 2 versions'))
	.on('error', function (err) {
      console.log(err.message + ' on line ' + err.lineNumber + ' in file : ' + err.fileName);
    })
    .pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.stream())
}

function images(){
	return gulp.src('src/images/*')
		.pipe(imagemin([
		pngquant({quality: [0.7, 0.7]}),
		mozjpeg({quality: 70}),
		]))
		.pipe(gulp.dest('dist/images'));
}

function compresswebp(){
	return gulp.src('src/images/*')
    .pipe(imagemin([
      webp({quality: 70})
	]))
	.pipe(rename(function (path) {
		path.extname = ".webp";
	  }))
    .pipe(gulp.dest('images'))
}

//compile js
function js(){
   gulp.src('src/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
		.pipe(gulp.dest('./js'))
		.pipe(browserSync.stream())
		.pipe(browserSync.reload())
}

//watch for changes
function watch(){
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
	gulp.watch('./src/sass/**/*.scss', css);
	gulp.watch('./src/**/*.js', js);
	gulp.watch('./dist/*.html').on('change', browserSync.reload);
}

exports.css = css;
exports.js = js;
exports.images = images;
exports.compresswebp = compresswebp;
exports.watch = watch;

gulp.task('default', watch);


