import React from 'react';
import Head from 'next/head';
import {config} from 'config'

export default function SEO({
}) {
  const metaData = [
    {
      name: `description`,
      content: config.experiment.description,
    },
    {
      property: `og:title`,
      content: config.experiment.domain,
    },
    {
      property: `og:description`,
      content: config.experiment.description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:title`,
      content: config.experiment.domain,
    },
    {
      name: `twitter:description`,
      content: config.experiment.description,
    },
    {
      name: `keywords`,
      content: config.experiment.keywords,
    }
  ];

  return (
    <Head>
      <title>{config.experiment.domain}</title>
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  );
}
