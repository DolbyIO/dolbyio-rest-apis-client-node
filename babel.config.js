const { version } = require('./package.json');

module.exports = function (api) {
    api.cache(true);

    const presets = ['@babel/preset-env', '@babel/preset-typescript'];

    const plugins = [
        [
            'inline-replace-variables',
            {
                __VERSION__: version,
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
