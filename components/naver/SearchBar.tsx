/* eslint-disable no-alert */
import { useEffect, useRef, useState } from 'react';
import ImportIcon from '../common/SvgDynamic';

export default function SearchBar({
  naverMap,
}: {
  naverMap: naver.maps.Map | undefined;
}) {
  const [isHide, setIsHide] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const clMarker = useRef<naver.maps.Marker>();

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

  useEffect(() => {
    naverMap?.addListener('click', () => {
      if (isHide) {
        setIsHide(false);
        document.getElementById('nav')!.style.bottom = '3%';
      } else {
        setIsHide(true);
        document.getElementById('nav')!.style.bottom = '-100px';
      }
    });
  }, [isHide, naverMap]);

  return (
    <>
      <div
        className={`fixed flex place-content-between z-40 w-4/5 bg-white py-2 border shadow-nav left-2/4 translate-x-[-50%] rounded-full transition-all ${
          isHide ? 'top-[-50px]' : 'top-10'
        }`}
      >
        <input
          className="w-5/6 ml-4 mr-2 focus:outline-none"
          placeholder="현재 위치를 입력해주세요."
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              searchAddress();
            }
          }}
          type="search"
          ref={inputRef}
        />
        <div className="flex mr-4">
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
      <div
        className={`fixed z-40 bg-white rounded-full left-[5%] shadow-nav transition-all ${
          isHide ? 'bottom-[-20%]' : 'bottom-[20%]'
        }`}
      >
        <button
          className="p-4 sm:hidden"
          onClick={() => findCurrentLocation()}
          type="button"
        >
          <ImportIcon icon="icon-gps" className="w-[24px]" />
        </button>
      </div>
    </>
  );
}
