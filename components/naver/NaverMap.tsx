/* eslint-disable no-alert */
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
import ReqBtns from './ReqBtns';

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
    | EarthquakeOutdoors[]
    | EarthquakeIndoors[]
    | TemporaryHousing[]
    | TsunamiShelter[]
  >();

  const findCurrentLocation = () => {
    const markerImg: naver.maps.ImageIcon = {
      url: './ico/icon-mymarker.svg',
      scaledSize: new naver.maps.Size(50, 50),
      anchor: naver.maps.Position.CENTER,
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
          zIndex: 30,
          clickable: false,
        });
        naverMap.setCenter(latlng);
      });
    }
  };

  const searchAddress = () => {
    if (inputRef.current?.value) {
      naver.maps.Service.geocode(
        { query: inputRef.current.value },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK) {
            return alert('Something Wrong!');
          }
          if (response.v2.meta.totalCount === 0) {
            return alert('올바른 주소를 입력해주세요.');
          }
          const result = response.v2.addresses[0];
          const lat = Number(result.y);
          const lng = Number(result.x);

          return naverMap?.setCenter(new naver.maps.LatLng(lat, lng));
        },
      );
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
      { id: 2, name: 'TsunamiShelter', page: 1 },
      { id: 3, name: 'EarthquakeIndoors', page: 6 },
      { id: 4, name: 'EarthquakeOutdoors', page: 11 },
    ];
    const menu = menuList.find((e) => e.id === id);
    const requestList = [];
    for (let i = 0; i < menu!.page; i++) {
      requestList.push(axios.get(`/api/${menu!.name}/${i + 1}`));
    }

    await axios.all(requestList).then(
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
    const mapBounds: naver.maps.Bounds = map.getBounds();
    const max: naver.maps.Point = mapBounds.getMax();
    const min: naver.maps.Point = mapBounds.getMin();
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
          const po = marker.getPosition();
          map.panTo(po, { duration: 500, easing: 'linear' });
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
      if (markerList.current.length > 0) {
        for (let i = 0; i < markerList.current.length; i++) {
          markerList.current[i].infowindow.close();
          markerList.current[i].marker.setMap(null);
        }
        markerList.current = [];
      }
      if (naverMap.getZoom() > 13) {
        updateMarkers(naverMap);
      }
      if (naverMap.hasListener('idle')) {
        naverMap.clearListeners('idle');
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
      <div className="fixed flex place-content-between z-40 w-4/5 bg-white py-2 border shadow-nav top-10 left-2/4 translate-x-[-50%] rounded-full">
        <input
          className="w-5/6 ml-4 focus:outline-none"
          placeholder="현재 위치를 입력해주세요."
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              searchAddress();
            }
          }}
          type="text"
          ref={inputRef}
        />
        <div className="flex justify-center mr-4">
          <button
            className="hidden sm:block"
            onClick={() => findCurrentLocation()}
            type="button"
          >
            <ImportIcon icon="icon-gps" className="w-[24px]" />
          </button>
          <button
            className="ml-[20px]"
            onClick={() => searchAddress()}
            type="button"
          >
            <ImportIcon icon="icon-search" className="w-[24px]" />
          </button>
        </div>
      </div>
      <div className="fixed z-40 bg-white rounded-full left-[5%] bottom-[20%] shadow-nav">
        <button
          className="p-4 sm:hidden"
          onClick={() => findCurrentLocation()}
          type="button"
        >
          <ImportIcon icon="icon-gps" className="w-[24px]" />
        </button>
      </div>
      <ReqBtns getData={getData} />
      <div className="w-full h-screen" ref={mapRef} />
    </div>
  );
}
