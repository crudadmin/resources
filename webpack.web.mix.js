const TargetsPlugin = require('targets-webpack-plugin'),
      mix = require('laravel-mix');

mix.webpackConfig({
    plugins: [
        new TargetsPlugin({
            browsers: ['last 2 versions', 'chrome >= 41', 'IE 11'],
        }),
    ]
});

var mixConfig = require('./config.js');

mixConfig.setMixConfig(mix, ({ paths, publicPath }) => {
    mix.sass('src/Resources/sass/frontend.scss', publicPath+'/css')
       .js('src/Resources/js/plugins/FrontendEditor.js', publicPath+'/js')
       .js([
        'src/Resources/js/plugins/Frontend/Encryptable.js',
        'src/Resources/js/plugins/Frontend/VisibleRoutes.js',
        'src/Resources/js/plugins/Gettextable.js',
       ], publicPath+'/js/Gettextable.js');


    for ( copyPath of paths ) {
        mix.copy(publicPath+'/js/Gettextable.js', copyPath + '/js/Gettextable.js')
           .copy(publicPath+'/js/FrontendEditor.js', copyPath + '/js/FrontendEditor.js')
           .copy(publicPath+'/css/frontend.css', copyPath + '/css/frontend.css')
           .copy(publicPath+'/images', copyPath + '/images');
    }
});