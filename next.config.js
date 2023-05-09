module.exports = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};
