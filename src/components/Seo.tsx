import React from "react";
import Head from "next/head";

interface ISeoProps {
  title:string
}

const Seo:React.FC<ISeoProps> = ({title}) => {
  return (
    <Head>
      <title>{title} | NextSplash </title>
    </Head>
  );
};

export default Seo;
