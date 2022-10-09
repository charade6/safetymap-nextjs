import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '../layout/Layout';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        defer
        async
        onLoad={() => {
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
          }
        }}
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
