var gulp            = require('gulp'),
    args            = require('yargs').argv,
    config          = require('./gulp.config')(),
    cp              = require('child_process'),
    del             = require('del'),
    browserSync     = require('browser-sync'),
    jekyll          = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
    messages        = { jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'},
    $               = require('gulp-load-plugins')({lazy: true});


/**           table of content
***  browserSync
***  images
***  imagesClean
***  inject
***  jekyllBuild
***  jekyllRebuild
***  js
***  optimize
***  pug
***  pugClean
***  sass
***  showTasks
***  sassClean
***  vet
***  watch
***  wiredep

*/

gulp.task('browserSync',['watch', 'jekyllBuild'], function() {
        return browserSync({
            //proxy: 'localhost:4000',
            files: ['**/*.*'],
            port: 4000,
            ghostMode: {
              clickd: true,
              location: false,
              forms: true,
              scroll:true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            reloadDelay: 0,
            server: { baseDir: '_site' },
            notify: true
        });
    });

gulp.task('default', ['browserSync']);
// optimize images and move them to assets for build
gulp.task('images',['imagesClean'], function() {
    log('copy and compress images to assets folder');

    return gulp
        .src(config.devImages)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.assetImages));
});
gulp.task('imagesClean', function() {
    var files = config.cleanImages;
    return clean(files);
});
gulp.task('inject',['wiredep','sass'], function () {
  log('injecting custom css into html index file and call wiredep');
    return gulp
            .src(config.index)
            .pipe($.inject(gulp.src(config.devCssMain)))
            .pipe(gulp.dest(config.development));
});
/// gulp Task to Build the Jekyll Site
gulp.task('jekyllBuild', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});
//// Rebuild Jekyll & do page reload
gulp.task('jekyllRebuild', ['jekyllBuild'], function () {
    browserSync.reload();
});
/// js task
gulp.task('js', function () {
  log('adding new js to _site');
    return gulp
        .src(config.jsAll)
        .pipe($.plumber())
        .pipe($.concat('custom.min.js'))
        //.pipe($.rename('custom.min.js'))
        .pipe(gulp.dest(config.siteJs))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('optimize', ['inject', 'cleanAssets', 'images', 'pug'], function () {
        return gulp.src(config.index)
            .pipe($.useref({searchPath: ['./bower_components','']}))
            .pipe($.if('*.css', $.cleanCss()))
            .pipe($.if('*.js', $.uglify()))
            .pipe(gulp.dest('./'));
    });

    // clean css task
    gulp.task('cleanAssets', function() {
        var files = config.cleanAssets;
        return clean(files);
    });

    gulp.task('moveIndex', function () {
            return gulp.src(config.proIndex)
                .pipe($.rename('default.html'))
                .pipe(gulp.dest('./_layouts'));
        });

        gulp.task('clean-layout', function() {
            var files = config.layout;
            return clean(files);
        });
//// pug tasks
gulp.task('pug',['pugClean'], function(){
    return gulp.src(config.pug)
    .pipe($.pug())
    .pipe(gulp.dest(config.includes));
});
gulp.task('pugClean', function() {
    var files = config.cleanpug;
    return clean(files);
});
///// sass tasks
gulp.task('sass', ['sassClean'], function () {
  log('compiling Sass ----> CSS');
    return gulp
        .src(config.sassMain)
        .pipe($.plumber())
        .pipe($.sass({
            onError: browserSync.notify
        }))
        .pipe($.autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(config.devCSS))
        .pipe($.rename('custom.min.css'))
        .pipe(gulp.dest(config.siteCsS))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('sassClean', function() {
    var files = config.cleanCss;
    return clean(files);
});
//  show all Tasks
gulp.task('showTasks', $.taskListing);
// Code analysis with JSHint and JSCS
gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print.default()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});
/// watch task
gulp.task('watch', function () {
    gulp.watch(config.sassAll, ['sass']);
    gulp.watch(config.jsAll, ['js']);
    gulp.watch(config.allPug, ['pug']);
    gulp.watch(['*.html','*.md', '_layouts/*.html', '_includes/*','./assets/images/*'], ['jekyllRebuild']);
    gulp.watch(config.devImages, ['images']);
});
// injection
gulp.task('wiredep', function () {
  log('injecting bower css, js and custom js into html index file');
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;
    return gulp
            .src(config.index)
            .pipe(wiredep(options))
            .pipe($.inject(gulp.src(config.customJs)))
            .pipe(gulp.dest(config.development));
});
////////////////////////////////////////////////
//////////////// functions /////////////////////
////////////////////////////////////////////////

//////    clean function
function clean(path) {
  log('Cleaning: '+ $.util.colors.blue(path));
  return del(path);

}
//////    log function to pring out message
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
