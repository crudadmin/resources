const mix = require('laravel-mix');

//Where sould be compiled assets
var config = require('./config.js');

config.setMixConfig(mix);

mix.sass('src/Resources/sass/frontend.scss', mix.config.publicPath+'/css')
   .js('src/Resources/js/plugins/TranslatableEditor.js', mix.config.publicPath+'/js')
   .scripts([
    'src/Resources/js/plugins/Frontend/Encryptable.js',
    'src/Resources/js/plugins/Gettextable/Plugins.js',
    'src/Resources/js/plugins/Gettextable.js',
   ], mix.config.publicPath+'/js/Gettextable.js');


for ( key in config.paths )
{
    mix.copy(mix.config.publicPath+'/js/Gettextable.js', config.paths[key] + '/js/Gettextable.js')
       .copy(mix.config.publicPath+'/js/TranslatableEditor.js', config.paths[key] + '/js/TranslatableEditor.js')
       .copy(mix.config.publicPath+'/css/frontend.css', config.paths[key] + '/css/frontend.css')
       .copy(mix.config.publicPath+'/images', config.paths[key] + '/images')
}
