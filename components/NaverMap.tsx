import { useEffect, useRef, useState } from 'react';

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();

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
  }, []);

  useEffect(() => {
    console.log(naverMap);
  }, [naverMap]);

  return <div className="w-full h-screen" ref={mapRef} />;
}
