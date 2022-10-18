/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  TemporaryHousing,
  EarthquakeIndoors,
  EarthquakeOutdoors,
  TsunamiShelter,
} from '../../types/apiType';
import Loading from '../Loading';
import ImportIcon from '../SvgDynamic';
import InfowindowBox from './InfowindowBox';

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

  const [api, setApi] = useState<
    | TsunamiShelter[]
    | EarthquakeIndoors[]
    | TemporaryHousing[]
    | TsunamiShelter[]
  >();

  const findCurrentLocation = () => {
    const markerImg: naver.maps.ImageIcon = {
      url: './ico/icon-mymarker.svg',
    };
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
          icon: markerImg,
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
        center: { lat: 37.40404429977153, lng: 126.93065304776769 },
        zoom: 15,
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);
    }
  };

  const updateMarkers = (map: naver.maps.Map) => {
    if (markerList.current.length > 0) {
      for (let i = 0; i < markerList.current.length; i++) {
        markerList.current[i].infowindow.close();
        markerList.current[i].marker.setMap(null);
      }
      markerList.current = [];
    }

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

      const infowindowDiv = InfowindowBox({
        name: filt[i].vt_acmdfclty_nm,
        address: filt[i].dtl_adres,
        lat: filt[i].ycord,
        lng: filt[i].xcord,
      });

      const infowindow = new naver.maps.InfoWindow({
        content: infowindowDiv,
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
    if (api && naverMap) {
      if (naverMap.getZoom() > 13) {
        updateMarkers(naverMap);
      }
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
        <input
          className="w-5/6 ml-4 focus:outline-none"
          type="text"
          ref={inputRef}
        />
        <div className="flex justify-center mr-4">
          <button onClick={() => findCurrentLocation()} type="button">
            <ImportIcon icon="icon-gps" className="w-[24px]" />
          </button>
          <button className="ml-[20px]" type="button">
            <ImportIcon icon="icon-search" className="w-[24px]" />
          </button>
        </div>
      </div>
      <div className="fixed z-40 bg-white right-5 top-2/4 translate-y-[-50%] text-xs">
        <button
          className="block w-[80px] h-[80px] hover:text-white hover:bg-[#009548] group"
          onClick={() => getData(1)}
          type="button"
        >
          <ImportIcon
            icon="main_side_one"
            className="mx-auto mb-[6px] w-[44px] h-[44px] fill-black group-hover:fill-white"
            viewBox="0 0 512 436"
          />
          대피소
        </button>
        <button
          className="block w-[80px] h-[80px] hover:text-white hover:bg-[#009548] group"
          onClick={() => getData(4)}
          type="button"
        >
          <ImportIcon
            icon="main_side_two"
            className="mx-auto mb-[6px] w-[40px] h-[40px] fill-black group-hover:fill-white"
            viewBox="0 0 512 452"
          />
          지진 해일 대피
        </button>
        <button
          className="block w-[80px] h-[80px] hover:text-white hover:bg-[#009548] group"
          onClick={() => getData(2)}
          type="button"
        >
          <ImportIcon
            icon="main_side_three"
            className="mx-auto mb-[6px] fill-black group-hover:fill-white"
          />
          실내 지진 대피
        </button>
        <button
          className="block w-[80px] h-[80px] hover:text-white hover:bg-[#009548] group"
          onClick={() => getData(3)}
          type="button"
        >
          <ImportIcon
            icon="main_side_four"
            className="mx-auto mb-[6px] fill-black group-hover:fill-white"
          />
          실외 지진 대피
        </button>
      </div>
      <div className="w-full h-screen" ref={mapRef} />
    </div>
  );
}
