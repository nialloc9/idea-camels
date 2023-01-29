import React from "react";
import NextHead from "next/head";
import { config, content } from "../../config";
import { concatArrayToString } from "../../utils/utils";

export default function Head({}) {
  const metaData = [
    // {
    //   name: `description`,
    //   content: config.experiment.description,
    // },
    {
      property: `og:title`,
      content: config.experiment.domain,
    },
    // {
    //   property: `og:description`,
    //   content: config.experiment.description,
    // },
    {
      property: `og:type`,
      content: `website`,
    },
    // {
    //   name: `twitter:card`,
    //   content: config.experiment.description,
    // },
    {
      name: `twitter:title`,
      content: config.experiment.domain,
    },
    // {
    //   name: `twitter:description`,
    //   content: config.experiment.description,
    // },
  ];

  return (
    <NextHead>
      <title>{config.experiment.domain}</title>
      <link rel="icon" href={content.navigation.logo.src} />
      <meta
        name="keywords"
        content={concatArrayToString({ arr: config.experiment.keywords })}
      />
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </NextHead>
  );
}
