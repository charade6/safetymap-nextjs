export default function KakaoShare() {
  window.Kakao.Share.sendDefault({
    objectType: 'location',
    content: {
      title: `대림대학교`,
      description: '안양시 동안구',
      imageUrl:
        'http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png',
    },
  });
}
