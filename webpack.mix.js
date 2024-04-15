let mix = require('laravel-mix'),
    section = process.env.npm_config_section || 'admin';

if (['admin', 'web'].includes(section)) {
    require(`${__dirname}/webpack.${section}.mix.js`);
} else {
    console.log('\x1b[41m%s\x1b[0m', 'Provide correct --section argument to build command: admin, web');
    throw new Error('Provide correct --section argument to build command!');
}
