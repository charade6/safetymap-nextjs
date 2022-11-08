export const kakaoLoad = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }
};

export const kakaoShare = ({
  address,
  name,
  lat,
  lng,
  maptype,
}: {
  address: string;
  name: string;
  lat: number;
  lng: number;
  maptype: string;
}) => {
  window.Kakao.Share.sendDefault({
    objectType: 'location',
    address,
    content: {
      title: '대피소 찾기',
      description: name,
      imageUrl:
        'https://64.media.tumblr.com/db707ec4d468a23273fe4353c86fbd3e/df33f1c96f9eea5b-d6/s2048x3072/d0b88139d9f9250ccfff428c3ebc5d4a315025bf.jpg',
      link: {
        mobileWebUrl: `https://safetymap-nextjs.vercel.app/map?type=${maptype}&lat=${lat}&lng=${lng}`,
        webUrl: `https://safetymap-nextjs.vercel.app/map?type=${maptype}&lat=${lat}&lng=${lng}`,
      },
    },
    buttonTitle: '홈페이지로',
  });
};
