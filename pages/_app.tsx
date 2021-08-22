import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    
  }, [])

  return (
    <>
      <Head>
        <script src="/runtime-env.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp
