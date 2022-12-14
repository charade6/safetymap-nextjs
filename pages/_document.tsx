import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="naver-site-verification"
          content="c4240f7309199ead02257e16195f034975e92309"
        />
        <meta
          name="google-site-verification"
          content="2YmO28hzY0QhcX4jEBYn_I6DOyT4VPJaBUN-fsO4stQ"
        />
        <meta
          name="description"
          content="내 위치 기반한 긴급 대피 장소를 알려드립니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="주변 대피소 찾기" />
        <meta
          property="og:description"
          content="내 위치 기반한 긴급 대피 장소를 알려드립니다."
        />
        <meta
          property="og:image"
          content="https://safetymap-nextjs.vercel.app/favicon-32x32.ico"
        />
        <meta property="og:url" content="https://safetymap-nextjs.vercel.app" />
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
