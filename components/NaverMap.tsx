/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  TemporaryHousing,
  EarthquakeIndoors,
  EarthquakeOutdoors,
  TsunamiShelter,
} from '../types/apiType';

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
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

  const getData = async (id: number) => {
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
    getData(2);
  }, [mapRef]);

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
      {!api && (
        <div className="absolute z-30 w-full h-screen bg-black opacity-30" />
      )}
      <div className="w-full h-screen" ref={mapRef} />
    </div>
  );
}
