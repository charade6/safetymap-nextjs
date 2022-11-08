/* eslint-disable no-alert */
import { useCallback, useEffect, useRef, useState } from 'react';
import MarkerIco from '../assets/ico/icon-mymarker.svg?url';
import { ApiTypes } from '../types/apiType';

const useNaverMap = (map?: naver.maps.Map) => {
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [isHide, setIsHide] = useState<boolean>(false);
  const clMarker = useRef<naver.maps.Marker>();
  const markerList = useRef<
    {
      marker: naver.maps.Marker;
      infowindow: naver.maps.InfoWindow;
    }[]
  >([]);

  useEffect(() => {
    if (map) {
      setNaverMap(map);
    }
  }, [map]);

  useEffect(() => {
    const uiHide = () => {
      if (isHide) {
        document.getElementById('nav')!.style.bottom = '3%';
        setIsHide(!isHide);
      } else {
        document.getElementById('nav')!.style.bottom = '-100px';
        setIsHide(!isHide);
      }
    };

    if (naverMap) {
      naverMap?.addListenerOnce('click', () => {
        uiHide();
      });
    }
  }, [isHide, naverMap]);

  const initMap = (container: HTMLDivElement | null) => {
    if (container) {
      const mapOptions = {
        center: { lat: 37.40404429977153, lng: 126.93065304776769 },
        zoom: 15,
      };
      const newMap = new naver.maps.Map(container, mapOptions);
      setNaverMap(newMap);
    }
  };

  const findCurrentLocation = () => {
    const markerImg: naver.maps.ImageIcon = {
      url: MarkerIco,
      scaledSize: new naver.maps.Size(50, 50),
      anchor: naver.maps.Position.CENTER,
    };
    if (clMarker.current) {
      clMarker.current.setMap(null);
    }

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const latlng = new naver.maps.LatLng(lat, lng);

        clMarker.current = new naver.maps.Marker({
          position: latlng,
          map,
          icon: markerImg,
          zIndex: 30,
          clickable: false,
        });
        map.setCenter(latlng);
      });
    }
  };

  const searchAddress = (word: string | undefined) => {
    if (word) {
      naver.maps.Service.geocode({ query: word }, (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          return alert('Something Wrong!');
        }
        if (response.v2.meta.totalCount === 0) {
          return alert('올바른 주소를 입력해주세요.');
        }
        const result = response.v2.addresses[0];
        const lat = Number(result.y);
        const lng = Number(result.x);

        return map?.setCenter(new naver.maps.LatLng(lat, lng));
      });
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

  const updateMarkers = useCallback((api: ApiTypes) => {
    // if (map.getZoom() > 13) {
    //   const mapBounds: naver.maps.Bounds = map.getBounds();
    //   const max: naver.maps.Point = mapBounds.getMax();
    //   const min: naver.maps.Point = mapBounds.getMin();
    //   const filtArray = api?.filter(
    //     (e) =>
    //       e.xcord > min.x &&
    //       e.xcord < max.x &&
    //       e.ycord > min.y &&
    //       e.ycord < max.y,
    //   );
    //   for (let i = 0; i < markerList.current.length; i++) {
    //     if (!mapBounds.hasPoint(markerList.current[i].marker.getPosition())) {
    //       markerList.current[i].marker.setMap(null);
    //     }
    //   }
    //   markerList.current = markerList.current.filter(
    //     (e) => e.marker.getMap() !== null,
    //   );
    //   for (let i = 0; i < filtArray.length; i++) {
    //     const marker = new naver.maps.Marker({
    //       position: new naver.maps.LatLng(
    //         filtArray[i].ycord,
    //         filtArray[i].xcord,
    //       ),
    //       map,
    //     });
    //     const infowindowDiv = InfowindowBox({
    //       name: filtArray[i].vt_acmdfclty_nm,
    //       address: filtArray[i].dtl_adres,
    //       lat: filtArray[i].ycord,
    //       lng: filtArray[i].xcord,
    //     });
    //     const infowindow = new naver.maps.InfoWindow({
    //       content: infowindowDiv,
    //     });
    //     marker.addListenerOnce('click', () => {
    //       infowindow.open(map, marker);
    //     });
    //     map.addListenerOnce('drag', () => {
    //       if (infowindow.getMap()) {
    //         infowindow.close();
    //       }
    //     });
    //     markerList.current.push({ marker, infowindow });
    //   }
    // }
  }, []);

  return {
    naverMap,
    isHide,
    initMap,
    findCurrentLocation,
    searchAddress,
    clearMarker,
    updateMarkers,
  };
};

export default useNaverMap;
