export default function KakaoShare({
  address,
  name,
}: {
  address: string;
  name: string;
}) {
  window.Kakao.Share.sendDefault({
    objectType: 'location',
    address,
    content: {
      title: '대피소 찾기',
      description: name,
      imageUrl:
        'http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png',
      link: {
        mobileWebUrl: 'https://safetymap-nextjs.vercel.app/guide',
        webUrl: 'https://safetymap-nextjs.vercel.app/guide',
      },
    },
    buttonTitle: '홈페이지로',
  });
}
