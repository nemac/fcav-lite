module.exports = {
    webpack: (config, env) => {
        return {
            ...config,
            resolve: {
                    fallback: {
                        fs: false,
                        path: false,
                        assert: false,
                        os: false
                    }
                }
        };
    }
};
