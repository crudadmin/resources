const mix = require('laravel-mix');
const { Config } = require('laravel-mix');
const path = require('path');

var mixConfig = require('./config.js');

mixConfig.setMixConfig(mix, ({ paths, publicPath }) => {
    /*
     * Build backend js
     */
    mix.js('src/Resources/js/app.js', publicPath + '/js')
        .vue({
            version: 2,
            extractStyles: true,
            globalStyles: {
                scss: ['src/Resources/sass/_variables.scss', 'src/Resources/sass/_mixins.scss'],
            },
        })
        .sass('src/Resources/sass/app.scss', publicPath + '/css')
        .extract([
            'vue',
            'jquery',
            'lodash',
            'js-md5',
            'moment',
            'vue-router',
            'vue-fragment',
            'vue-resource',
            'vuedraggable',
            'jquery-datetimepicker',
            'bootstrap',
        ]);

    mix.webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/Resources/'),
                '@sass': path.resolve(__dirname, 'src/Resources/sass'),
                '@components': path.resolve(__dirname, 'src/Resources/js/components'),
            },
        },
    });

    for (copyPath of paths) {
        mix.copy(publicPath + '/js/manifest.js', copyPath + '/js/manifest.js')
            .copy(publicPath + '/js/vendor.js', copyPath + '/js/vendor.js')
            .copy(publicPath + '/js/app.js', copyPath + '/js/app.js')
            .copy(publicPath + '/css/app.css', copyPath + '/css/app.css')
            .copy(publicPath + '/images', copyPath + '/images')
            .copy(publicPath + '/fonts', copyPath + '/fonts');
    }
});
