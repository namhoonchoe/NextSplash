import React from "react";
import Head from "next/head";

const Seo:React.FC<string> = (title: string) => {
  return (
    <Head>
      <title>{title} | NextSplash </title>
    </Head>
  );
};

export default Seo;
