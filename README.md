# How this works???

1- working pug:
  - i watch pug folder in components in case of change:
    - pug task 





















# What I have prepared:

1- npm init (for package.json)
2- install gulp
      npm install --save-dev gulp
3- put git ignore
4- readme file
5- git init
6- gulp.js added and tested by following code:
      var gulp = require('gulp');

      gulp.task('helloWorld', function () {
          console.log('hello World to gulp');
      })
-----------------------------------------------------------    
What you need?
npm install -g jscs jshint (globaly)
npm install --save-dev gulp-util gulp-print gulp-if yargs gulp-jscs gulp-jshint jshint-stylish jshint

7- Code analysis with JSHint and JSCS
8- install jscs and jshint:
      npm install -g jscs jshint (globaly)
      npm install --save-dev gulp-jscs gulp-jshint jshint-stylish jshint
9- require them in gulpfile.js
      var jshint = require('gulp-jshint');
      var jscs = require('gulp-jscs');
10- gulp task to check js files
      gulp.task('vet', function () {
          return gulp
              .src([
                  './src/\**/*.js',
                  './*.js'
              ])
              .pipe(jscs())
              .pipe(jshint())
              .pipe(jshint.reporter('jshint-stylish',{verbose:true}));
      });
11- add .jscs.json file to root of your project
12- install gulp-util
      npm install --save-dev gulp-util
13- create a log in gulpfile.js
14- installing and use gulp print
      npm install --save-dev gulp-print
      gulpprint.default()
15- install gulp-if and yargs(with this you can add argument to gulp cli s)
      npm install --save-dev gulp-if yargs
16- use them like this
      .pipe(gulpif(args.verbose, gulpprint.default()))

----------------------------------------------------------------------
17- clean up a bit and start using gulp-load-plugins
      add gulp.config.js file to project
      update gulp file
      npm install --save-dev gulp-load-plugins
-----------------------------------------------------------------------      
18-  sass compilation:
20- to install:
      npm install --save-dev gulp-sass gulp-plumber gulp-autoprefixer
21- add these tasks (change configs accordingly and you are good to go)
      gulp.task('sass', function () {
        log('compiling Sass ----> CSS');
          return gulp
              .src(config.sassMain)
              .pipe($.plumber())
              .pipe($.sass({
                  includePaths: ['css'],
                  //onError: browserSync.notify
              }))
              .pipe($.autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
              // .pipe(browserSync.reload({stream:true}))
              .pipe(gulp.dest(config.devCSS));
      });


      // sass watch
      gulp.task('sasswatch', function () {
          gulp.watch(config.sassAll, ['sass']);
      });

--------------------------------------------------------------------------
22- injections
23- to install:
    npm i --save-dev wiredep gulp-inject
24- add index file in ./src/development
25- create js folder in development and production
26- create inject task in gulpfile
      gulp.task('wiredep', function () {
        var options = config.getWiredepDefaultOptions();
        var wiredep = require('wiredep').stream;
          return gulp
                  .src(config.index)
                  .pipe(wiredeo(options))
                  .pipe($.inject(config.customJs))
                  .pipe(gulp.dest(config.development));
      });
27- fix addresses in gulp.config
