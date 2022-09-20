module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: true,
  // SSG 배포를 하는 동안에는 Cloudfront 이슈로 trailingSlash: true 로 설정되어 있어야 함
  trailingSlash: true,
};
