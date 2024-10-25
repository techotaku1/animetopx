/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://animetopx.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://animetopx.vercel.app/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private'],
      },
    ],
  },
  // Add any dynamic routes here
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/additional-page'),
  // ],
};