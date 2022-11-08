import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        defer
        async
        // onLoad={() => kakaoLoad()}
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
