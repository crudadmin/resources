var config = {
    /*
     * Where do you vant build admin resources
     */
    paths : [
        '/volumes/ssd/www/{path-to-your-project}/public/vendor/crudadmin',
    ],

    setMixConfig(mix){
        mix.config.resourceRoot = '../';
        mix.config.publicPath = 'src/Resources/admin';
        mix.config.fileLoaderDirs.fonts = 'fonts';
    }
};

module.exports = config;