import type { AppProps } from 'next/app';
import type { FC } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next/types';
import { DefaultSeo } from 'next-seo';
import { BRAND_NAME } from '@/config';

type EnhancedAppProps = AppProps & {
  Component: NextPage;
};

const App: FC<EnhancedAppProps> = (appProps: any) => {
  const { Component, pageProps } = appProps;
  const getWrapper = (Component as any).getWrapper ?? ((page: React.ReactNode) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <DefaultSeo
        titleTemplate={`${BRAND_NAME} | %s`}
        defaultTitle={BRAND_NAME}
        description={`Build more reliable and scalable software with ${BRAND_NAME}. ${BRAND_NAME} makes it easy to build, monitor and manage your business processes with help of events and actions.`}
      />
      {getWrapper(<Component {...pageProps} />)}
    </>
  );
};

export default App;
