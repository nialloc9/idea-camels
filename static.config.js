import path from 'path'
import React from 'react'

export default {
  getRoutes: async () => {
    return [
      {
        path: '/blog'
      },
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
  Document: ({
    Html,
    Head,
    Body,
    children
  }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Archivo+Narrow|Cairo|Darker+Grotesque|Josefin+Sans|Playfair+Display&display=swap" rel="stylesheet" />
      </Head>
      <Body>{children}</Body>
    </Html>
  )
}
