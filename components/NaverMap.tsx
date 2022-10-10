import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  TemporaryHousingFacility,
  EarthquakeIndoors,
  EarthquakeOutdoorsShelter,
  TsunamiShelter,
} from '../types/apiType';

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [api, setApi] = useState<
    | TemporaryHousingFacility[]
    | EarthquakeIndoors[]
    | EarthquakeOutdoorsShelter[]
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
          | TemporaryHousingFacility[]
          | EarthquakeIndoors[]
          | EarthquakeOutdoorsShelter[]
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

  useEffect(() => {
    initMap();
    getData(1);
  }, [mapRef]);

  useEffect(() => {
    if (api) {
      console.log(api);
    }
  }, [api]);

  return <div className="w-full h-screen" ref={mapRef} />;
}
