/* eslint-disable no-alert */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ApiTypes } from '../../types/apiType';
import Loading from '../common/Loading';
import InfowindowBox from './InfowindowBox';
import SearchBar from './SearchBar';
import ReqBtns from './ReqBtns';
import getData from '../../api';

export default function NaverMap() {
  const router = useRouter();
  const { data } = router.query;
  const mapRef = useRef<HTMLDivElement>(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notiHide, setNotiHide] = useState<boolean>(true);
  const api = useRef<ApiTypes>();
  const markerList = useRef<
    {
      marker: naver.maps.Marker;
      infowindow: naver.maps.InfoWindow;
    }[]
  >([]);

  const setApi = useCallback(async () => {
    setIsLoading(true);
    if (data && !Array.isArray(data)) {
      try {
        api.current = await getData(data);
      } catch (error) {
        alert('데이터 불러오기에 실패하였습니다.');
      }
    }
    setIsLoading(false);
  }, [data]);

  const initMap = () => {
    if (mapRef.current) {
      const mapOptions = {
        center: { lat: 37.40404429977153, lng: 126.93065304776769 },
        zoom: 15,
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);
    }
  };
  const clearMarker = () => {
    if (markerList.current.length > 0) {
      for (let i = 0; i < markerList.current.length; i++) {
        markerList.current[i].infowindow.close();
        markerList.current[i].marker.setMap(null);
      }
      markerList.current = [];
    }
  };

  const updateMarkers = useCallback((map: naver.maps.Map) => {
    if (map.getZoom() > 13) {
      const mapBounds: naver.maps.Bounds = map.getBounds();
      const max: naver.maps.Point = mapBounds.getMax();
      const min: naver.maps.Point = mapBounds.getMin();
      const filtArray = api.current!.filter(
        (e) =>
          e.xcord > min.x &&
          e.xcord < max.x &&
          e.ycord > min.y &&
          e.ycord < max.y,
      );

      for (let i = 0; i < markerList.current.length; i++) {
        if (!mapBounds.hasPoint(markerList.current[i].marker.getPosition())) {
          markerList.current[i].marker.setMap(null);
        }
      }
      markerList.current = markerList.current.filter(
        (e) => e.marker.getMap() !== null,
      );
      for (let i = 0; i < filtArray.length; i++) {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            filtArray[i].ycord,
            filtArray[i].xcord,
          ),
          map,
        });

        const infowindowDiv = InfowindowBox({
          name: filtArray[i].vt_acmdfclty_nm,
          address: filtArray[i].dtl_adres,
          lat: filtArray[i].ycord,
          lng: filtArray[i].xcord,
        });

        const infowindow = new naver.maps.InfoWindow({
          content: infowindowDiv,
        });
        marker.addListenerOnce('click', () => {
          infowindow.open(map, marker);
        });
        map.addListenerOnce('drag', () => {
          if (infowindow.getMap()) {
            infowindow.close();
          }
        });
        markerList.current.push({ marker, infowindow });
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      setApi();
    }
  }, [data, setApi]);

  useEffect(() => {
    initMap();
  }, [mapRef]);

  useEffect(() => {
    if (naverMap) {
      clearMarker();
      naverMap.addListener('idle', () => {
        if (api.current) {
          updateMarkers(naverMap);
        }
      });
      naverMap.addListener('zoom_changed', () => {
        if (naverMap.getZoom() < 14) {
          setNotiHide(false);
          clearMarker();
        } else {
          setNotiHide(true);
        }
      });
    }
  }, [naverMap, updateMarkers]);

  return (
    <div>
      {isLoading && <Loading />}
      <SearchBar naverMap={naverMap} />
      <div
        id="noti"
        className={`fixed z-40 px-6 py-2 bg-white text-sm rounded-full shadow-nav left-2/4 top-24 translate-x-[-50%] transition-all ${
          notiHide ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        지도를 확대해 주세요!
      </div>
      <ReqBtns />
      <div className="w-full h-screen" ref={mapRef} />
    </div>
  );
}
