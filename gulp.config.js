module.exports = function() {
    var builds       = './src/builds/',
        components   = './src/components/',

        development  = builds  + 'development/',
        assets       = './assets/',
        site         = './_site/',
        production   = './production/';



    var config       =  {

        // all js to vet
        alljs: ['./src/**/*.js', './*.js'],
        customJs:     development  + 'js/*.js',

        index:        development  + 'index.html',
        development:  development,
        optimizeWatch:[

                      development  + '**/*.css',
                      development  + '**/*.js',
                      development  + '**/*.html'],

        sassMain:     components   + 'sass/main.scss',
        sassAll:      components   + 'sass/**/*.scss',
        devCssMain:   development  + 'css/main.css',
        devCSS:       development  + 'css',
        siteCsS:      site         + 'assets/css',
        cleanCss: [   development  + 'css/**/*.css'],
        jsAll:        development  + 'js/**/*.js',
        siteJs:       site         + 'assets/js',

        pug:          components   + 'pug/*.pug',
        allPug:       components   + 'pug/**/*.pug',
        cleanpug:                    '_includes/**/*.html',
        includes:                    '_includes',
        devImages:    development  + 'images/**/*.*',
        assetImages:  assets       + 'images',
        cleanImages:  assets       + 'images/**/*.*',
        production:   production   + '**/**/*.*',
        proAssets:    production   + 'assets/**/*.*',
        proIndex:     'index.html',
        cleanAssets:  [assets      + '**/**/*.*',
                 '!' + assets      + 'images/*.*'],

        /**
          * Bower and NPM locations
          */
         bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
          }

    };


    config.getWiredepDefaultOptions =  function () {
      var options = {
          bowerJson:   config.bower.json,
          directory:   config.bower.directory,
          ignorePath:  config.bower.ignorePath

      };
      return options;
    };

    return config;
};
