import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.6/static/pretendard.min.css"
          integrity="sha512-XspYaHjaxXmIm6C6Jb8gsr2SqKW5HGt7U+5QidmgWCNA3qFg5uMysLUJ4dAFYH6IVVqc1fSvfXD6FGALOW1OPA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
          strategy="beforeInteractive"
        />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.ico" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
