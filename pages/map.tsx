/* eslint-disable react-hooks/exhaustive-deps */
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
  const { type, lat, lng } = router.query;
  const mapRef = useRef<HTMLDivElement>(null);
  const naverapi = naverMap();
  const { data, isLoading, getData } = useAxios();

  useEffect(() => {
    naverapi.initMap(mapRef.current);
  }, [mapRef]);

  useEffect(() => {
    if (type) {
      getData(type.toString());
    }
  }, [type]);

  useEffect(() => {
    if (data.length > 0) {
      naverapi.updateMarkers(data);
      if (lat && lng) {
        naverapi.naverMap?.setCenter(
          new naver.maps.LatLng(Number(lat), Number(lng)),
        );
        naverapi.infowindowOpen();
      }
    }
  }, [data]);

  return (
    <>
      {isLoading && <Loading />}
      <SearchBar map={naverapi.naverMap} />
      <div
        className={`fixed z-40 px-6 py-2 bg-white text-sm rounded-full shadow-nav left-2/4 top-24 translate-x-[-50%] transition-all ${
          naverapi.notiHide ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        지도를 확대해 주세요!
      </div>
      <ReqBtns />
      <div className="w-full h-screen" ref={mapRef} />
    </>
  );
};

export default Map;
