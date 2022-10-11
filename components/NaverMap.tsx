/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  TemporaryHousing,
  EarthquakeIndoors,
  EarthquakeOutdoors,
  TsunamiShelter,
} from '../types/apiType';
import IcoSideOne from '../public/ico/main_side_one.svg';
import IcoSideTwo from '../public/ico/main_side_two.svg';
import IcoSideThree from '../public/ico/main_side_three.svg';
import IcoSideFour from '../public/ico/main_side_four.svg';
import IcoGps from '../public/ico/icon-gps.svg';
import IcoSeach from '../public/ico/icon-search.svg';
import Loading from './Loading';

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const clMarker = useRef<naver.maps.Marker>();
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const markerList = useRef<
    {
      marker: naver.maps.Marker;
      infowindow: naver.maps.InfoWindow;
    }[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = useState<
    | TsunamiShelter[]
    | EarthquakeIndoors[]
    | TemporaryHousing[]
    | TsunamiShelter[]
  >();

  const findCurrentLocation = () => {
    if (clMarker.current) {
      clMarker.current.setMap(null);
    }

    if (navigator.geolocation && naverMap) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const latlng = new naver.maps.LatLng(lat, lng);

        clMarker.current = new naver.maps.Marker({
          position: latlng,
          map: naverMap,
        });
        naverMap.setCenter(latlng);
      });
    }
  };

  const getData = async (id: number) => {
    setIsLoading(true);
    const menuList: {
      id: number;
      name: string;
      page: number;
    }[] = [
      { id: 1, name: 'TemporaryHousing', page: 15 },
      { id: 2, name: 'EarthquakeIndoors', page: 6 },
      { id: 3, name: 'EarthquakeOutdoors', page: 11 },
      { id: 4, name: 'TsunamiShelter', page: 1 },
    ];
    const menu = menuList.find((e) => e.id === id);

    const fetchList = [];
    for (let i = 0; i < menu!.page; i++) {
      fetchList.push(axios.get(`/api/${menu!.name}/${i + 1}`));
    }

    await axios.all(fetchList).then(
      axios.spread((...responses) => {
        const list:
          | TemporaryHousing[]
          | EarthquakeIndoors[]
          | EarthquakeOutdoors[]
          | TsunamiShelter[] = [];

        responses.forEach((e) => list.push(...e.data));
        setApi(list);
        setIsLoading(false);
      }),
    );
  };

  const initMap = () => {
    if (mapRef.current) {
      const mapOptions = {
        center: { lat: 37.3595704, lng: 127.105399 },
        zoom: 15,
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);
    }
  };

  const updateMarkers = (map: naver.maps.Map) => {
    const mapBounds = map.getBounds();
    const max = mapBounds.getMax();
    const min = mapBounds.getMin();
    const filt = api!.filter(
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
    for (let i = 0; i < filt.length; i++) {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(filt[i].ycord, filt[i].xcord),
        map,
      });
      const infowindow = new naver.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:10px;">${filt[i].dtl_adres}</div>`,
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });
      naver.maps.Event.addListener(naverMap, 'drag', () => {
        infowindow.close();
      });
      markerList.current.push({ marker, infowindow });
    }
  };

  useEffect(() => {
    initMap();
  }, [mapRef]);

  useEffect(() => {
    console.log(mapRef.current);
  }, [mapRef.current]);

  useEffect(() => {
    if (api && naverMap) {
      updateMarkers(naverMap);
      naverMap.addListener('idle', () => {
        if (naverMap.getZoom() > 13) {
          updateMarkers(naverMap);
        }
      });
      naverMap.addListener('zoom_changed', () => {
        if (naverMap.getZoom() < 14) {
          for (let i = 0; i < markerList.current.length; i++) {
            markerList.current[i].infowindow.close();
            markerList.current[i].marker.setMap(null);
          }
          markerList.current = [];
        }
      });
    }
  }, [api, naverMap]);

  return (
    <div>
      {isLoading && <Loading />}
      <div className="fixed flex place-content-between z-40 w-4/5 bg-white py-2 border border-[#151816] top-10 left-2/4 translate-x-[-50%] rounded-full">
        <input className="w-5/6 ml-4" type="text" ref={inputRef} />
        <div className="flex justify-center mr-4">
          <button onClick={() => findCurrentLocation()} type="button">
            <IcoGps className="w-[24px]" />
          </button>
          <button className="ml-[20px]" type="button">
            <IcoSeach className="w-[24px]" />
          </button>
        </div>
      </div>
      <div className="fixed z-40 bg-white right-5 top-2/4 translate-y-[-50%] text-xs">
        <button
          className="block w-[80px] h-[80px]"
          onClick={() => getData(1)}
          type="button"
        >
          <IcoSideOne
            className="mx-auto mb-[6px] w-[44px] h-[44px]"
            viewBox="0 0 512 436"
          />
          대피소
        </button>
        <button
          className="block w-[80px] h-[80px]"
          onClick={() => getData(4)}
          type="button"
        >
          <IcoSideTwo
            className="mx-auto mb-[6px] w-[40px] h-[40px]"
            viewBox="0 0 512 452"
          />
          지진 해일 대피
        </button>
        <button
          className="block w-[80px] h-[80px]"
          onClick={() => getData(2)}
          type="button"
        >
          <IcoSideThree className="mx-auto mb-[6px]" />
          실내 지진 대피
        </button>
        <button
          className="block w-[80px] h-[80px]"
          onClick={() => getData(3)}
          type="button"
        >
          <IcoSideFour className="mx-auto mb-[6px]" />
          실외 지진 대피
        </button>
      </div>
      <div className="w-full h-screen" ref={mapRef} />
    </div>
  );
}
