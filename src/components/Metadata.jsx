import React from "react";
import { Helmet } from "react-helmet";

export default () => (
  <Helmet title="Joshua Timmons" defaultTitle="Joshua Timmons" defer={false}>
    <title>Joshua Timmons</title>
    <meta charSet="utf-8" />
    <meta
      name="description"
      content="The personal site of Joshua Timmons: a software engineer and researcher"
    />
    <meta
      name="keywords"
      content="joshua, timmons, software, programming, biology"
    />
  </Helmet>
);
