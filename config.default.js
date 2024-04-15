var config = {
    options: {
        paths: ['/volumes/xyz/{path-to-your-project}/public/vendor/crudadmin'],
        resourceRoot: '../',
        publicPath: 'src/Resources/admin',
        options: {
            fileLoaderDirs: {
                fonts: 'fonts',
            },
        },
    },

    setMixConfig: function (mix, callback) {
        mix.setResourceRoot(this.options.resourceRoot);
        mix.setPublicPath(this.options.publicPath);
        mix.options(this.options.options);

        callback(this.options);
    },
};

module.exports = config;
