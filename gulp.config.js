module.exports = function() {
    var builds       = './src/builds/',
        components   = './src/components/',

        development  = builds  + 'development/',
        assets       = './assets/',
        site         = './_site/',
        production   = './production/';



    var config       =  {

        allPug:       components   + 'pug/**/*.pug',
        alljs:        ['./src/**/*.js', './*.js'],
        assetImages:  assets       + 'images',
        cleanCss: [   development  + 'css/**/*.css'],
        cleanAssets:  [assets      + '**/**/*.*',
                 '!' + assets      + 'images/*.*'],
        cleanImages:  assets       + 'images/**/*.*',
        cleanpug:                    '_includes/**/*.html',
        customJs:     development  + 'js/*.js',
        devCSS:       development  + 'css',
        devCssMain:   development  + 'css/main.css',
        devImages:    development  + 'images/**/*.*',
        development:  development,
        includes:                    '_includes',
        index:        development  + 'index.html',
        jsAll:        development  + 'js/**/*.js',
        optimizeWatch:[
                      development  + '**/*.css',
                      development  + '**/*.js',
                      development  + '**/*.html'],
        production:   production   + '**/**/*.*',
        proAssets:    production   + 'assets/**/*.*',
        proIndex:     'index.html',
        pug:          components   + 'pug/*.pug',
        sassMain:     components   + 'sass/main.sass',
        sassAll:      components   + 'sass/**/*.sass',
        siteCsS:      site         + 'assets/css',
        siteJs:       site         + 'assets/js',



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
