const mix = require('laravel-mix');

//Where sould be compiled assets
var config = require('./config.js');

mix.js('src/Resources/js/app.js', 'src/Resources/admin/js')
   .sass('src/Resources/sass/app.scss', 'src/Resources/admin/css')
   .extract([
        'vue', 'jquery', 'lodash', 'js-md5', 'moment', 'vue-router', 'vue-fragment',
        'vue-resource', 'vuedraggable', 'jquery-datetimepicker', 'bootstrap'
    ])

for ( key in config.paths )
{
    mix.copy('src/Resources/admin/js/manifest.js', config.paths[key] + '/js/manifest.js')
       .copy('src/Resources/admin/js/vendor.js', config.paths[key] + '/js/vendor.js')
       .copy('src/Resources/admin/js/app.js', config.paths[key] + '/js/app.js')
       .copy('src/Resources/admin/css/app.css', config.paths[key] + '/css/app.css');
}
