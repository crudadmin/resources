const TargetsPlugin = require('targets-webpack-plugin'),
      mix = require('laravel-mix');

mix.webpackConfig({
    plugins: [
        new TargetsPlugin({
            browsers: ['last 2 versions', 'chrome >= 41', 'IE 11'],
        }),
    ]
});

//Where sould be compiled assets
var config = require('./config.js');

config.setMixConfig(mix);

mix.sass('src/Resources/sass/frontend.scss', mix.config.publicPath+'/css')
   .js('src/Resources/js/plugins/FrontendEditor.js', mix.config.publicPath+'/js')
   .js([
    'src/Resources/js/plugins/Frontend/Encryptable.js',
    'src/Resources/js/plugins/Frontend/VisibleRoutes.js',
    'src/Resources/js/plugins/Gettextable.js',
   ], mix.config.publicPath+'/js/Gettextable.js');


for ( key in config.paths )
{
    mix.copy(mix.config.publicPath+'/js/Gettextable.js', config.paths[key] + '/js/Gettextable.js')
       .copy(mix.config.publicPath+'/js/FrontendEditor.js', config.paths[key] + '/js/FrontendEditor.js')
       .copy(mix.config.publicPath+'/css/frontend.css', config.paths[key] + '/css/frontend.css')
       .copy(mix.config.publicPath+'/images', config.paths[key] + '/images')
}
