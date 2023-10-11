import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `REST-Countries-API-With-Color-Theme-Switcher`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-layout",
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Nunito Sans`,
            file: `https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,600;6..12,800&display=swap`,
          },
        ],
      },
    },
  ],
  pathPrefix:
    "/frontend-mentor-02-rest-countries-api-with-color-theme-switcher-master",
};

export default config;
