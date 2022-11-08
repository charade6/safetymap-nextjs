import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import Loading from '../components/common/Loading';
import ReqBtns from '../components/naver/ReqBtns';
import SearchBar from '../components/naver/SearchBar';
import naverMap from '../hooks/useNaverMap';
import useAxios from '../hooks/useAxios';

const Map: NextPage = () => {
  const router = useRouter();
  const { type } = router.query;
  const mapRef = useRef<HTMLDivElement>(null);
  const naver = naverMap();
  // const [notiHide, setNotiHide] = useState<boolean>(true);
  const { data, isLoading, getData } = useAxios();

  useEffect(() => {
    naver.initMap(mapRef.current);
  }, [mapRef]);

  useEffect(() => {
    if (type) {
      getData(type.toString());
    }
  }, [type]);

  useEffect(() => {
    if (data.length > 0) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      {isLoading && <Loading />}
      <SearchBar map={naver.naverMap} />
      {/* <div
        id="noti"
        className={`fixed z-40 px-6 py-2 bg-white text-sm rounded-full shadow-nav left-2/4 top-24 translate-x-[-50%] transition-all ${
          notiHide ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        지도를 확대해 주세요!
      </div> */}
      <ReqBtns />
      <div className="w-full h-screen" ref={mapRef} />
    </>
  );
};

export default Map;
