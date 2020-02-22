const mix = require('laravel-mix');

//Where sould be compiled assets
var config = require('./config.js');

mix.js('src/Resources/js/app.js', 'src/Resources/admin/js')
   .sass('src/Resources/sass/app.scss', 'src/Resources/admin/css')
   .sass('src/Resources/sass/frontend.scss', 'src/Resources/admin/css')
   .extract([
        'vue', 'jquery', 'lodash', 'js-md5', 'moment', 'vue-router', 'vue-fragment',
        'vue-resource', 'vuedraggable', 'jquery-datetimepicker', 'bootstrap'
    ]);

mix.config.resourceRoot = '/vendor/crudadmin';
mix.config.publicPath = 'src/Resources/admin';
mix.config.fileLoaderDirs.fonts = 'fonts';

for ( key in config.paths )
{
    mix.copy('src/Resources/admin/js/manifest.js', config.paths[key] + '/js/manifest.js')
       .copy('src/Resources/admin/js/vendor.js', config.paths[key] + '/js/vendor.js')
       .copy('src/Resources/admin/js/app.js', config.paths[key] + '/js/app.js')
       .copy('src/Resources/admin/css/app.css', config.paths[key] + '/css/app.css')
       .copy('src/Resources/admin/css/frontend.css', config.paths[key] + '/css/frontend.css')
       .copy('src/Resources/admin/images', config.paths[key] + '/images')
       .copy('src/Resources/admin/fonts', config.paths[key] + '/fonts');
}
