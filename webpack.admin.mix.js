const mix = require('laravel-mix');
const path = require('path');

//Where sould be compiled assets
var config = require('./config.js');

config.setMixConfig(mix);

/*
 * Build backend js
 */
mix.js('src/Resources/js/app.js', mix.config.publicPath+'/js')
   .sass('src/Resources/sass/app.scss', mix.config.publicPath+'/css')
   .extract([
        'vue', 'jquery', 'lodash', 'js-md5', 'moment', 'vue-router', 'vue-fragment',
        'vue-resource', 'vuedraggable', 'jquery-datetimepicker', 'bootstrap'
    ])
   .options({
     extractVueStyles: true,
     globalVueStyles: 'src/Resources/sass/_variables.scss',
   });

mix.webpackConfig({
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/Resources/js/components'),
        }
    }
});

for ( key in config.paths )
{
    mix.copy(mix.config.publicPath+'/js/manifest.js', config.paths[key] + '/js/manifest.js')
       .copy(mix.config.publicPath+'/js/vendor.js', config.paths[key] + '/js/vendor.js')
       .copy(mix.config.publicPath+'/js/app.js', config.paths[key] + '/js/app.js')
       .copy(mix.config.publicPath+'/css/app.css', config.paths[key] + '/css/app.css')
       .copy(mix.config.publicPath+'/images', config.paths[key] + '/images')
       .copy(mix.config.publicPath+'/fonts', config.paths[key] + '/fonts');
}