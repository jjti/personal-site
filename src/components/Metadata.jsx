import React from "react";
import { Helmet } from "react-helmet";

export default () => (
  <Helmet title="Joshua Timmons" defaultTitle="Joshua Timmons" defer={false}>
    <title>Joshua Timmons</title>
    <meta charSet="utf-8" />
    <meta
      name="description"
      content="Personal site of Joshua Timmons, yet another software engineer"
    />
    <meta
      name="keywords"
      content="joshua, timmons, software, programming, vanity, biology, amazon, aws, lattice, research, sarasota, florida, boston, massachusetts"
    />
  </Helmet>
);
