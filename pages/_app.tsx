import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../layout/Layout';
import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        strategy="beforeInteractive"
      />
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        defer
        async
        strategy="afterInteractive"
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
