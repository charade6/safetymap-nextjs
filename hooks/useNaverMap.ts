/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import MarkerIco from '../assets/ico/icon-mymarker.svg?url';
import InfowindowBox from '../components/naver/InfowindowBox';
import { ApiTypes } from '../types/apiType';

const useNaverMap = (map?: naver.maps.Map) => {
  const router = useRouter();
  const { type, lat, lng } = router.query;
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [uiHide, setUiHide] = useState<boolean>(false);
  const [notiHide, setNotiHide] = useState<boolean>(true);
  const clMarker = useRef<naver.maps.Marker>();
  const api = useRef<ApiTypes>([]);
  const apiname = useRef<string | string[]>();
  const markerList = useRef<
    {
      marker: naver.maps.Marker;
      infowindow: naver.maps.InfoWindow;
    }[]
  >([]);

  const initMap = (container: HTMLDivElement | null) => {
    if (container) {
      const mapOptions = {
        center: {
          lat: lat ? Number(lat) : 37.40404429977153,
          lng: lng ? Number(lng) : 126.93065304776769,
        },
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
        const { latitude } = pos.coords;
        const { longitude } = pos.coords;
        const latlng = new naver.maps.LatLng(latitude, longitude);

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
        const latitude = Number(result.y);
        const longitude = Number(result.x);

        return map?.setCenter(new naver.maps.LatLng(latitude, longitude));
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

  const createMarkers = () => {
    if (naverMap) {
      clearMarker();
      if (naverMap.getZoom() > 13) {
        const mapBounds: naver.maps.Bounds = naverMap.getBounds();
        const max: naver.maps.Point = mapBounds.getMax();
        const min: naver.maps.Point = mapBounds.getMin();
        const filtArray = api.current.filter(
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
            map: naverMap,
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
          marker.addListener('click', () => {
            if (!infowindow.getMap()) {
              router.replace({
                query: {
                  type: apiname.current,
                  lat: filtArray[i].ycord,
                  lng: filtArray[i].xcord,
                },
              });
              // infowindow.open(naverMap, marker);
            } else {
              infowindow.close();
              router.replace({ query: { type: apiname.current } });
            }
          });
          naverMap.addListener('dragstart', () => {
            if (infowindow.getMap()) {
              infowindow.close();
            }
          });
          markerList.current.push({ marker, infowindow });
        }
      }
    }
  };

  const updateMarkers = (data: ApiTypes) => {
    api.current = data;
    if (naverMap) {
      createMarkers();
    }
  };

  const infowindowOpen = useCallback(() => {
    if (naverMap) {
      if (lat && lng) {
        const result = markerList.current.find(
          (e) =>
            e.marker.getPosition().y === Number(lat) &&
            e.marker.getPosition().x === Number(lng),
        );
        result?.infowindow.open(naverMap, result.marker);
      }
    }
  }, [lat, lng]);

  useEffect(() => {
    if (naverMap) {
      naverMap.addListener('zoom_changed', () => {
        if (naverMap.getZoom() > 13) {
          setNotiHide(true);
        } else {
          setNotiHide(false);
        }
      });
    }
  }, [notiHide, naverMap]);

  useEffect(() => {
    if (map) {
      map?.addListener('click', () => {
        if (uiHide) {
          document.getElementById('nav')!.style.bottom = '3%';
        } else {
          document.getElementById('nav')!.style.bottom = '-100px';
        }
        setUiHide(!uiHide);
      });
    }
  }, [uiHide, map]);

  useEffect(() => {
    if (type) {
      apiname.current = type;
    }
  }, [type]);

  useEffect(() => {
    infowindowOpen();
  }, [infowindowOpen]);

  useEffect(() => {
    if (naverMap) {
      naverMap.addListener('idle', () => {
        createMarkers();
      });
      naverMap.addListener('zoom_changed', () => {
        router.replace({ query: { type: apiname.current } });
        if (naverMap.getZoom() < 14) {
          clearMarker();
        }
      });
      naverMap.addListener('dragstart', () => {
        router.replace({
          query: { type: apiname.current },
        });
      });
    }
  }, [naverMap]);

  return {
    naverMap,
    uiHide,
    notiHide,
    initMap,
    findCurrentLocation,
    searchAddress,
    clearMarker,
    updateMarkers,
    infowindowOpen,
  };
};

export default useNaverMap;
